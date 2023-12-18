using DataAccess.Migrations;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.CategoryService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductController : ControllerBase
	{
		private readonly IProductService _service;
		private readonly IWebHostEnvironment _webHostEnvironment;

		public ProductController(IProductService service) {
			this._service = service;
		}

		[HttpGet("")]
		public IActionResult GetAllProducts()
		{
			var result = _service.GetAllProducts();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("{id}")]
		public IActionResult GetProduct(int id)
		{
			var result = _service.GeteProduct(x => x.Id == id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost("")]
		public IActionResult AddProduct(Product product)
		{
			_service.InsertProduct(product);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
		public IActionResult UpdateeProduct(int id, Product product)
		{
			product.Id = id;
			_service.UpdateProduct(product);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteProduct(int id)
		{			
			_service.DeleteProduct(id);
			return Ok("Data Deleted");
		}
	}
}
