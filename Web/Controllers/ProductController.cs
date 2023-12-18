using DataAccess.Migrations;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductController : ControllerBase
	{
		private readonly IProductService _productService;
		private readonly ICityService _cityService;
		private readonly IConcreteProductService _concreteProductService;
		private readonly IWebHostEnvironment _webHostEnvironment;

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
			var result = _productService.GeteProduct(x => x.Id == id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost("")]
		public IActionResult AddProduct(Product product)
		{
			_productService.InsertProduct(product);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
		public IActionResult UpdateProduct(int id, Product product)
		{
			product.Id = id;
			_productService.UpdateProduct(product);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteProduct(int id)
		{			
			_productService.DeleteProduct(id);
			return Ok("Data Deleted");
		}
	}
}
