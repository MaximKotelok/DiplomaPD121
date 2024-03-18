using Domain.Dto;
using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Repository.Repository.Interfaces;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PharmacyController : ControllerBase
	{
		private readonly IPharmacyService _pharmacyService;
		private readonly ICityService _cityService;
        private readonly IRepositoryManager _repository;


        public PharmacyController(IPharmacyService service, ICityService _cityService, IRepositoryManager repository) {
			this._pharmacyService = service;
			this._cityService = _cityService;
			this._repository = repository;
		}

		[HttpGet("")]
		public IActionResult GetAllPharmacies()
		{
			var result = _pharmacyService.GetAllPharmacies();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetAllConcreteProductsFromPharmacy/{id}")]
		public IActionResult GetAllConcreteProductsFromPharmacy(int id)
		{
			var result = _pharmacyService.GetPharmacy(a=>a.Id==id, "ConcreteProducts");
			if (result is not null)
			{
				return Ok(result.ConcreteProducts);
			}
			return BadRequest("Pharmacy not found");
		}

		[HttpGet("GetPharmacyProduct")]
		public IActionResult GetPharmacyProduct(int id, int productId)
		{
			var result = _pharmacyService.GetPharmacy(x => x.Id == id, "ConcreteProducts,ConcreteProducts.Product")?.ConcreteProducts;
			if (result is not null)
			{
				var product = result.First(a=>a.Id==productId);
				return Ok(product);
			}
			return BadRequest("No records found");
		}

		[HttpGet("{id}")]
		public IActionResult GetPharmacy(int id)
		{	
			var result = _pharmacyService.GetPharmacy(x => x.Id == id, "PharmaCompany");
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("Coords/{latitude}/{longitude}")]

		public IActionResult GetPharmacyByCoords(string latitude, string longitude)
		{
			var result = _pharmacyService.GetPharmacy(x => x.Latitude == latitude && x.Longitude == longitude);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetListOfPharmacyInYourCity/{cityName}")]
		public IActionResult GetListOfPharmacyInYourCity(string cityName)
		{
			var city = _cityService.GetCity(a => a.NameCity == cityName);
			if (city is not null)
			{
				var result = _pharmacyService.GetAllPharmacies(a => a.CityID == city.Id, "PharmaCompany");

				return Ok(result);
			}
			return BadRequest("No records found");
		}

        [HttpPost("UpsertPharmacy")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public async Task<IActionResult> UpsertBrand(PostPharmacyViewModel postModel)
        {
            /*using var transaction = new TransactionScope();*/
            try
            {
                await UpsertPharmacyEntity(postModel);

                /* transaction.Complete();*/
                return Ok("Data inserted");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to upsert product. Error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeletePharmacy(int id)
		{
			_pharmacyService.DeletePharmacy(id);
			return Ok("Data Deleted");
		}

        private async Task UpsertPharmacyEntity(PostPharmacyViewModel postModel)
        {
            var pharmacy = new Pharmacy
            {
				Address = postModel.Address,
				OpenTime = postModel.OpenTime,
				CloseTime = postModel.CloseTime,
				Longitude = postModel.Longitude,
				Latitude = postModel.Latitude,
				PharmaCompanyID = postModel.PharmaCompanyID,
				CityID = postModel.CityID,
            };


            if (postModel.Id == null)
            {
                var user = new UserRegistrationDto
                {
                    UserName = postModel.Username,
                    Password = postModel.Password,
                    Email = postModel.Email,
                };

                user.Roles = new List<string>
                {
                    SD.Role_Company
                };

                _pharmacyService.InsertPharmacy(pharmacy);
                await _repository.UserAuthentication.RegisterUserAsync(user);
            }
            else
            {
                pharmacy.Id = postModel.Id.Value;
                _pharmacyService.UpdatePharmacy(pharmacy);
            }

            Console.WriteLine("added");
        }

    }
}
