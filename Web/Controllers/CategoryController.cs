using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.CategoryService;
using Services.PharmacyCompanyService;
using Utility;

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

		[HttpGet("Main/All")]
		public IActionResult GetAllMainCategories()
		{
			var result = _service.GetCategory(x => x.ParentCategory == null, "SubCategories" );
			if (result is not null)
			{
				return Ok(result.SubCategories);
			}
			return BadRequest("No records found");
		}

		[HttpGet("Main")]
		public IActionResult GetMainCategory() 
		{
			var result = _service.GetCategory(x => x.ParentCategory == null);
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

		[HttpGet("/GetSubCategories/{id}")]
		public IActionResult GetSubCategories(int id)
		{
			var result = _service.GetSubCategoryFromCategory(id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}
		[HttpGet("/GetProductsFromCategory/{id}")]
		public IActionResult GetProductsFromCategory(int id)
		{
			var result = _service.GetProductsFromCategory(id);
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
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult AddCategory(Category category)
		{
			_service.InsertCategory(category);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult UpdateCategory(int id, Category category)
		{
			category.Id = id;
			_service.UpdateCategory(category);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeleteCategory(int id)
		{			
			_service.DeleteCategory(id);
			return Ok("Data Deleted");
		}
	}
}
