using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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

		public PharmacyController(IPharmacyService service, ICityService _cityService) {
			this._pharmacyService = service;
			this._cityService = _cityService;
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

		[HttpGet("/GetAllConcreteProductsFromPharmacy/{id}")]
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
				var result = _pharmacyService.GetAllPharmacies(a => a.CityID == city.Id);

				return Ok(result);
			}
			return BadRequest("No records found");
		}

        [HttpPost]
				[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult AddPharmacy(Pharmacy pharmacy)
		{
			_pharmacyService.InsertPharmacy(pharmacy);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult UpdatePharmacy(int id, Pharmacy pharmacy)
		{
			pharmacy.Id = id;
			_pharmacyService.UpdatePharmacy(pharmacy);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeletePharmacy(int id)
		{
			_pharmacyService.DeletePharmacy(id);
			return Ok("Data Deleted");
		}
	}
}
