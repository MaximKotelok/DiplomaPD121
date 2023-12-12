using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using Domain.Models;
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
	public class ConcreteProductConctroller : ControllerBase
	{
		private readonly IConcreteProductService _service;

		public ConcreteProductConctroller(IConcreteProductService service) {
			this._service = service;
		}

		[HttpGet("")]
		public IActionResult GetAllConcreteProducts()
		{
			var result = _service.GetAllConcreteProducts();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("{id}")]
		public IActionResult GetConcreteProduct(int id)
		{
			var result = _service.GetConcreteProduct(id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost]
		public IActionResult AddConcreteProduct(ConcreteProduct concreteProduct)
		{
			_service.InsertConcreteProduct(concreteProduct);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
		public IActionResult UpdateConcreteProduct(int id, ConcreteProduct concreteProduct)
		{
			concreteProduct.Id = id;
			_service.UpdateConcreteProduct(concreteProduct);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteConcreteProduct(int id)
		{			
			_service.DeleteConcreteProduct(id);
			return Ok("Data Deleted");
		}
	}
}
