using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.CategoryService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;

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
		public IActionResult AddPharmacy(Pharmacy pharmacy)
		{
			_service.InsertPharmacy(pharmacy);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
		public IActionResult UpdatePharmacy(int id, Pharmacy pharmacy)
		{
			pharmacy.Id = id;
			_service.UpdatePharmacy(pharmacy);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
		public IActionResult DeletePharmacy(int id)
		{			
			_service.DeletePharmacy(id);
			return Ok("Data Deleted");
		}
	}
}
