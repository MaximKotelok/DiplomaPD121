using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.AttributeService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.MedicineService;
using Services.PharmacyService;
using Services.PropertyService;
using Services.ReservationService;
using Services.UserService;
using Utility;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : Controller
    {
        private readonly IReservationService _reservationService;
        private readonly IReservationStatusService _reservationStatusService;
        private readonly IConcreteProductService _concreteProductService;
        private readonly IPharmacyService _pharmacyService;
        private readonly IUserService _userService;

        public ReservationController(IReservationService reservationService, 
            IReservationStatusService reservationStatusService, IUserService userService,
			IConcreteProductService concreteProductService,
			IPharmacyService pharmacyService)
        {
			_pharmacyService = pharmacyService;
            _reservationService = reservationService;
            _userService = userService;
            _reservationStatusService = reservationStatusService;
			_concreteProductService = concreteProductService;
        }

        [HttpPost("LoggedReserve")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> LoggedReserve(ReservationPostViewModel model)
        {
            User user = await _userService.GetUserByName(User.Identity.Name);

            var products = model
                .ConcreteProducts!
                .Select(a => 
                new ReservationItem 
                { 
                    ConcreteProductID = a.ConcreteProductId.Value, 
                    ConcreteProduct = _concreteProductService.GetConcreteProduct(b => b.Id == a.ConcreteProductId),
                    Quantity=a.Quantity.Value                    
                })
                .ToList();
            int pharmacyID = products[0]!.ConcreteProduct.PharmacyID!.Value;

			if (!products.All(a=>a.ConcreteProduct.PharmacyID == pharmacyID)){
                return BadRequest("All products must be in one same pharmacy");
            }


			Reservation reservation = new Reservation
            {
                PharmacyID = pharmacyID,
                Email = user.Email,
                Phone = user.PhoneNumber,
                User = user,
                ReservationItems = products,
                ReservedTime =DateTime.Now,
				StatusID = _reservationStatusService.GetAllReservationStatuses(a => a.Status == SD.ReservationStatusWaiting).FirstOrDefault().Id
			};

            _reservationService.InsertReservation(reservation);
            return Ok();
        }

        [HttpPost("Reserve")]
        public IActionResult Reserve(ReservationPostViewModel model)
        {

			var products = model
				.ConcreteProducts!
				.Select(a =>
				new ReservationItem
				{
					ConcreteProductID = a.ConcreteProductId.Value,
					ConcreteProduct = _concreteProductService.GetConcreteProduct(b => b.Id == a.ConcreteProductId),
					Quantity = a.Quantity.Value
				})
				.ToList();
			int pharmacyID = products[0]!.ConcreteProduct.PharmacyID!.Value;

			if (!products.All(a => a.ConcreteProduct.PharmacyID == pharmacyID))
			{
                return BadRequest("All products must be in one same pharmacy");

			}


			Reservation reservation = new Reservation
			{
				PharmacyID = pharmacyID,			
				Email = model.Email,
				Phone = model.Phone,
				ReservationItems = products,
				ReservedTime = DateTime.Now,
				StatusID = _reservationStatusService.GetAllReservationStatuses(a=>a.Status==SD.ReservationStatusWaiting).FirstOrDefault().Id
			};
			_reservationService.InsertReservation(reservation);
            return Ok();
        }

        [HttpGet("GetReservations")]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<IActionResult> GetReservations()
        {
			User user = await _userService.GetUserByName(User.Identity.Name);
			var reservations = _reservationService.GetAllReservations(a => a.UserID == user.Id, "ReservationItems,ReservationItems.ConcreteProduct,Status,Pharmacy,Pharmacy.PharmaCompany");
            var data = reservations.Select(reservation =>
            {
                var total = reservation.ReservationItems!.Sum(a => a.ConcreteProduct!.Price * a.Quantity);
                var pharmacy = reservation.Pharmacy;
                return new { Id = reservation.Id,Name=reservation.Pharmacy.PharmaCompany!.Title, ReservedTime = reservation.ReservedTime, Pharmacy = pharmacy, Total = total, Status = reservation.Status };
            }).OrderByDescending(a=>a.ReservedTime);

            return Ok(data);

		}

		[HttpGet("GetAllReservationsStatuses")]		
		public async Task<IActionResult> GetAllReservationsStatuses()
        { 
			return Ok(_reservationStatusService.GetAllReservationStatuses());

		}

		[HttpPost("GetPharmacyReservations")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Pharmacist)]
		public async Task<IActionResult> GetPharmacyReservations(PageViewModel model)
		{            
			User user = await _userService.GetUserByName(User.Identity.Name);
            
			var reservations = _reservationService.GetAllReservations(a => 
                a.Pharmacy.UserID == user.Id, "Pharmacy,User,ReservationItems,ReservationItems.ConcreteProduct"
			).OrderByDescending(a => a.ReservedTime); 

            int countOfPages = model.GetCountOfPages(reservations.Count());
            int page = model.Page != null?model.Page.Value -1: 0;
            var data = reservations.Skip(model.ItemsPerPage * page).Take(model.ItemsPerPage).Select(reservation =>
            {
                return new
                {
                    Id = reservation.Id,
                    ReservedTime = reservation.ReservedTime.ToString("dd/MM/yyyy HH:mm"),
                    FullName =
                        ((reservation.User != null && reservation.User.FirstName != null && reservation.User.LastName != null) ?
                            $"{reservation.User.FirstName} {reservation.User.LastName}" :
                            reservation.User != null? reservation.User.UserName : reservation.Email),
                    PhoneNumber = reservation.Phone,
                    PriceAndCount = $"{reservation.ReservationItems.Sum(a => a.ConcreteProduct.Price * a.Quantity)}({reservation.ReservationItems.Sum(a => a.Quantity)}шт)",
                    Status = reservation.StatusID
                };
            });

			return Ok(new { data, countOfPages });

		}

		[HttpGet("GetReservation")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Pharmacist)]
		public async Task<IActionResult> GetReservation(int? id)
		{
			User user = await _userService.GetUserByName(User.Identity.Name);

			var reservation = _reservationService.GetReservation(a =>
				a.Pharmacy.UserID == user.Id && a.Id == id, "Pharmacy,User,ReservationItems,ReservationItems.ConcreteProduct,ReservationItems.ConcreteProduct.Product"
			);
			return Ok(
                new
                {
                    Status = reservation.StatusID,
					ReservationItems = reservation.ReservationItems,
					ReservedTime = reservation.ReservedTime.ToString("dd/MM/yyyy HH:mm"),

				}
                
                );

		}

		[HttpPost("Cancel")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public IActionResult Сancel(int id)
        {
            ReservationStatus reservationStatus = _reservationStatusService.GetReservationStatus(x => x.Status == SD.ProductStatusRejected);
            if (reservationStatus == null)
                return NoContent();

            Reservation reservation = _reservationService.GetReservation(x => x.Id == id);
            if (reservationStatus == null)
                return NoContent();

            reservation.Status = reservationStatus;
            _reservationService.UpdateReservation(reservation);
            return Ok();
        }

        [HttpPost("SetOrderStatus")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Pharmacist)]
        public async Task<IActionResult> SetOrderStatus(ReservationStatusViewModel statusViewModel)
        {
			User user = await _userService.GetUserByName(User.Identity.Name);
			ReservationStatus reservationStatus = _reservationStatusService.GetReservationStatus(x => x.Id == statusViewModel.StatusId);
            if (reservationStatus == null)
                return NoContent();

            Reservation reservation = _reservationService.GetReservation(x => x.Id == statusViewModel.ReservationId && x.Pharmacy.UserID == user.Id, "Pharmacy");
            if (reservationStatus == null)
                return NoContent();

            reservation.Status = reservationStatus;
            _reservationService.UpdateReservation(reservation);

            return Ok();
        }

        [HttpPost("Delete")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult Delete(int id)
        {
            _reservationService.DeleteReservation(id);
            return Ok();
        }
    }
}
