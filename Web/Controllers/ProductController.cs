using DataAccess.Migrations;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductController : ControllerBase
	{
		private readonly IProductService _productService;
		private readonly ICityService _cityService;
		private readonly IConcreteProductService _concreteProductService;		

		public ProductController(
			IProductService productService, 
			ICityService cityService, 
			IConcreteProductService concreteProductService
			) {
			this._productService = productService;
			this._cityService = cityService;
			this._concreteProductService = concreteProductService;
		}

		[HttpGet("")]
		public IActionResult GetAllProducts()
		{
			var result = _productService.GetAllProducts();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}


		[HttpPost("/GetAllProductsFromIdArray")]
		public IActionResult GetAllProductsFromIdArray(int[] idArray)
		{
			if (idArray.IsNullOrEmpty())
				return Ok("idArray is empty");


			var result = _productService
				.GetAllProducts(a=> idArray.Contains(a.Id))
				.OrderBy(a => Array.IndexOf(idArray, a.Id));
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}


		[HttpGet("GetListOfConcreteProductInYourCity/{cityName}/{productId}")]
		public IActionResult GetListOfConcreteProductInYourCity(int productId, string cityName)
		{
			var city = _cityService.GetCity(a => a.NameCity == cityName);
			if (city is not null)
			{				
				var result = _concreteProductService.GetAllConcreteProducts(
					a => a.ProductID == productId
					&&
					a.Pharmacy.CityID == city.Id, "Pharmacy");

				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("{id}")]
		public IActionResult GetProduct(int id)
		{
			var result = _productService.GetProduct(x => x.Id == id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost("")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult AddProduct(Product product)
		{
			_productService.InsertProduct(product);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult UpdateProduct(int id, Product product)
		{
			product.Id = id;
			_productService.UpdateProduct(product);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult DeleteProduct(int id)
		{			
			_productService.DeleteProduct(id);
			return Ok("Data Deleted");
		}
	}
}
