using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.AttributeService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.MedicineService;
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
        private readonly IUserService _userService;

        public ReservationController(IReservationService reservationService, 
            IReservationStatusService reservationStatusService, IUserService userService,
			IConcreteProductService concreteProductService)
        {
            _reservationService = reservationService;
            _userService = userService;
            _reservationStatusService = reservationStatusService;
			_concreteProductService = concreteProductService;
        }

        [HttpPost("LoggedReserve")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> LoggedReserve([FromBody] ReservationPostViewModel model)
        {
            User user = await _userService.GetUserByName(User.Identity.Name);

            Reservation reservation = new Reservation
            {
                Email = user.Email,
                Phone = user.PhoneNumber,
                User = user,
                ConcreteProducts = model
                .ConcreteProducts.Select(a => _concreteProductService.GetConcreteProduct(b=>b.Id==a))
                .ToList(),
				StatusID = _reservationStatusService.GetAllReservationStatuses(a => a.Status == SD.ReservationStatusWaiting).FirstOrDefault().Id
			};

            _reservationService.InsertReservation(reservation);
            return Ok();
        }

        [HttpPost("Reserve")]
        public IActionResult Reserve(ReservationPostViewModel data)
        {
			Reservation reservation = new Reservation
			{
				Email = data.Email,
				Phone = data.Phone,
				ConcreteProducts = data
				.ConcreteProducts.Select(a => _concreteProductService.GetConcreteProduct(b => b.Id == a))
				.ToList(),
                StatusID = _reservationStatusService.GetAllReservationStatuses(a=>a.Status==SD.ReservationStatusWaiting).FirstOrDefault().Id


			};
			_reservationService.InsertReservation(reservation);
            return Ok();
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

        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        [HttpPost("SetStatus")]
        public IActionResult SetStatus(ReservationStatusViewModel statusViewModel)
        {
            ReservationStatus reservationStatus = _reservationStatusService.GetReservationStatus(x => x.Id == statusViewModel.StatusId);
            if (reservationStatus == null)
                return NoContent();

            Reservation reservation = _reservationService.GetReservation(x => x.Id == statusViewModel.ReservationId);
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
