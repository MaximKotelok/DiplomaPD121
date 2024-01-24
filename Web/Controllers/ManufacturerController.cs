using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.ActiveSubstanceService;
using Services.CategoryService;
using Services.ManufacturerService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ManufacturerController : Controller
	{
		private readonly IManufacturerService _service;

		public ManufacturerController(IManufacturerService service)
		{
			this._service = service;
		}

		[HttpGet("GetAllManufacturers")]
		public IActionResult GetAllManufacturers()
		{
			var result = _service.GetAllManufacturers();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("{id}")]
		public IActionResult GetManufacturer(int id)
		{
			var result = _service.GetManufacturer(x => x.Id == id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

	}
}
