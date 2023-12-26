using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.CategoryService;
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
		private readonly IPharmacyService _service;

		public PharmacyController(IPharmacyService service) {
			this._service = service;
		}

		[HttpGet("")]
		public IActionResult GetAllPharmacies()
		{
			var result = _service.GetAllPharmacies();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("/GetAllConcreteProductsFromPharmacy/{id}")]
		public IActionResult GetAllConcreteProductsFromPharmacy(int id)
		{
			var result = _service.GetPharmacy(a=>a.Id==id, "ConcreteProducts");
			if (result is not null)
			{
				return Ok(result.ConcreteProducts);
			}
			return BadRequest("Pharmacy not found");
		}

		[HttpGet("{id}")]
		public IActionResult GetPharmacy(int id)
		{
			var result = _service.GetPharmacy(x => x.Id == id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost]
                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult AddPharmacy(Pharmacy pharmacy)
		{
			_service.InsertPharmacy(pharmacy);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult UpdatePharmacy(int id, Pharmacy pharmacy)
		{
			pharmacy.Id = id;
			_service.UpdatePharmacy(pharmacy);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeletePharmacy(int id)
		{			
			_service.DeletePharmacy(id);
			return Ok("Data Deleted");
		}
	}
}
