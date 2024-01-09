using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.CategoryService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ConcreteProductController : ControllerBase
	{
		private readonly IConcreteProductService _service;

		public ConcreteProductController(IConcreteProductService service) {
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

		[HttpGet("GetSupInfoForProductInYourCity")]
		public IActionResult GetSupInfoForProductInYourCity(string city, int id)
		{
			var result = _service.GetAllConcreteProducts(a=>a.ProductID==id 
			&& 
			a.Pharmacy.City.NameCity == city && a.Quantity > 0, "Pharmacy,Pharmacy.City");
			if (!result.IsNullOrEmpty())
			{
				return Ok(new { minPrice = result.Min(a => a.Price), count=result.Count() });
			}
			return Ok(new { minPrice = 0.0, count = 0 });
		}

		[HttpGet("{id}")]
		public IActionResult GetConcreteProduct(int id)
		{
			var result = _service.GetConcreteProduct(x => x.Id == id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost]
//                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult AddConcreteProduct(ConcreteProduct concreteProduct)
		{
			_service.InsertConcreteProduct(concreteProduct);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult UpdateConcreteProduct(int id, ConcreteProduct concreteProduct)
		{
			concreteProduct.Id = id;
			_service.UpdateConcreteProduct(concreteProduct);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeleteConcreteProduct(int id)
		{			
			_service.DeleteConcreteProduct(id);
			return Ok("Data Deleted");
		}
	}
}
