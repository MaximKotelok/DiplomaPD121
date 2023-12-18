using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.ActiveSubstanceService;
using Services.CategoryService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ActiveSubstanceController : Controller
	{
		private readonly IActiveSubstanceService _service;

		public ActiveSubstanceController(IActiveSubstanceService service)
		{
			this._service = service;
		}

		[HttpGet("")]
		public IActionResult GetAllIActiveSubstances()
		{
			var result = _service.GetAllActiveSubstances();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("{id}")]
		public IActionResult GetActiveSubstance(int id)
		{
			var result = _service.GetActiveSubstance(x => x.Id == id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult AddActiveSubstance(ActiveSubstance activeSubstance)
		{
			_service.InsertActiveSubstance(activeSubstance);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult UpdateActiveSubstance(int id, ActiveSubstance activeSubstance)
		{
			activeSubstance.Id = id;
			_service.UpdateActiveSubstance(activeSubstance);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult DeleteActiveSubstance(int id)
		{
			_service.DeleteActiveSubstance(id);
			return Ok("Data Deleted");
		}

		[HttpGet("/GetListOfMedicineOfActiveSubstance/{id}")]
		public IActionResult GetListOfMedicineOfActiveSubstance(int id)
		{
			var result = _service.GetActiveSubstance(a => a.Id == id, "Medicines");
			if (result is not null)
			{
				return Ok(result?.Medicines);
			}
			return BadRequest("No records found");			
		}

	}
}
