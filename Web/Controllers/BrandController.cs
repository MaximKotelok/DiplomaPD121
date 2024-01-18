using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.ActiveSubstanceService;
using Services.BrandService;
using Services.CategoryService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BrandController : Controller
	{
		private readonly IBrandService _service;

		public BrandController(IBrandService service)
		{
			this._service = service;
		}

		[HttpGet("GetRecomendedBrands")]
		public IActionResult GetRecomendedBrands(int count)
		{
			var result = _service.GetAllBrands().Take(count);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

	}
}
