using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.PharmacyCompanyService;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PharmaCompanyController : ControllerBase
	{
		private readonly IPharmaCompanyService _service;

		public PharmaCompanyController(IPharmaCompanyService service) {
			this._service = service;
		}

		[HttpGet("/GetPharmaCompanies")]
		public IActionResult GetPharmaCompanies()
		{
			var result = _service.GetAllPharmaCompanies();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("/GetPharmaCompany/{id}")]
		public IActionResult GetPharmaCompany(int id)
		{
			var result = _service.GetPharmaCompany(id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost]
		public IActionResult AddPharmCompany(PharmaCompany company)
		{
			_service.InsertPharmaCompany(company);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
		public IActionResult UpdatePharmCompany(PharmaCompany company)
		{
			_service.UpdatePharmaCompany(company);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
		public IActionResult DeletePharmCompany(int id)
		{
			_service.DeletePharmaCompany(id);
			return Ok("Data Deleted");
		}
	}
}
