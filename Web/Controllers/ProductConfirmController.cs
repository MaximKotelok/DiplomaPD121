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
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductConfirmController : ControllerBase
	{
		private readonly IProductConfirmService _productConfirmService;


		public ProductConfirmController(IProductConfirmService productConfirmService)
		{
			this._productConfirmService = productConfirmService;
		}

		[HttpGet("")]
		public IActionResult GetAllRequests()
		{
			var rawResult = _productConfirmService.GetAllProductConfirm(includeProperties: "ProductStatus,Product,Product.Manufacturer,Product.Category");
			if (rawResult is not null)
			{
				var result = rawResult
				.Select(a=>
				new {
					Id=a.Product!.Id,
					Title=a.Product.Title, 
					Date=a.CreationDate.ToString("yyyy/MM/dd"),
					Manafacturer = a.Product!.Manufacturer!.Address,
					Category = a.Product.Category!.Title,
					Status = a.ProductStatus.Status!.ToString(),
					StatusId = a.ProductStatusID
				});
			
				return Ok(result);
			}
			return BadRequest("No records found");
		}
	}
}
