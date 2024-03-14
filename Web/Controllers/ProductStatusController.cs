using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Services.ProductConfirmService;
using Services.ProductStatusService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductStatusController : ControllerBase
	{
		private readonly IProductStatusService _productStatusService;


		public ProductStatusController(IProductStatusService productStatusService)
		{
			this._productStatusService = productStatusService;
		}

		[HttpGet("")]
		public IActionResult GetAllStatuses()
		{
			var result = _productStatusService.GetAllStatuses();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}
	}
}
