using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.CategoryService;
using Services.PharmacyCompanyService;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
		private readonly ICategoryService _service;

		public CategoryController(ICategoryService service) {
			this._service = service;
		}

		[HttpGet("")]
		public IActionResult GetAllCategories()
		{
			var result = _service.GetAllCategories();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("{id}")]
		public IActionResult GetCategory(int id)
		{
			var result = _service.GetCategory(x=> x.Id == id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("/path/{id}")]
		public IActionResult GetCategoryPath(int id)
		{

			var result = _service.GetPathToCategory(id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost]
		public IActionResult AddCategory(Category category)
		{
			_service.InsertCategory(category);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
		public IActionResult UpdateCategory(int id, Category category)
		{
			category.Id = id;
			_service.UpdateCategory(category);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteCategory(int id)
		{			
			_service.DeleteCategory(id);
			return Ok("Data Deleted");
		}
	}
}
