using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.CategoryService;
using Services.PharmacyCompanyService;
using System;
using System.Collections.Generic;
using System.Linq;
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

		[HttpGet("GetRecomendedCategoryById")]
		public IActionResult GetRecomendedCategoryById(int id, int count)
		{
			var result = _service.GetCategory(a =>
				a.Id == id, includeProperties: "SubCategories");

			if (result is not null)
			{
				return Ok(new { result=result.SubCategories.Take(count), id});
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetRecomendedCategory")]
		public IActionResult GetRecomendedCategory(string typeOfPhoto, int count)
		{
			var result = _service.GetAllCategories(a=> 
				(a.IsRecomended != null && a.IsRecomended.Value && a.SubCategoriesTypeOfPhoto == Enum.Parse<TypeOfPhoto>(typeOfPhoto)));

			
			if (result is not null && result.Count()>0)
			{
				var randomId = result.ElementAt(new Random().Next(0, result.Count())).Id;
				var randomRes = _service.GetCategory(a => a.Id == randomId,
					includeProperties: "SubCategories").SubCategories.Take(count);
				return Ok(new { result=randomRes, id=randomId });
			}
			return BadRequest("No records found");
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
		public IActionResult GetAllMainCategories(int count)
		{
			var result = _service.GetCategory(x => x.ParentCategory == null, "SubCategories" );
			if (result is not null)
			{
				return Ok(result.SubCategories.Take(count));
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

		[HttpGet("GetSubCategories/{id}")]
		public IActionResult GetSubCategories(int id)
		{
			var category = _service.GetCategory(a => a.Id == id, "SubCategories");
			IEnumerable<Category> categories = null;
			if (category is not null)
				categories = category?.SubCategories;
			if (categories is not null)
			{
				return Ok(categories);
			}
			return BadRequest("No records found");
		}
		[HttpGet("GetProductsFromCategory/{id}")]
		public IActionResult GetProductsFromCategory(int id)
		{
			var category = _service.GetCategory(a => a.Id == id, "Products");
			IEnumerable<Product> products = null;
			if (category is not null)
				products = category?.Products;
			if (products is not null)
			{
				return Ok(products);
			}
			return BadRequest("No records found");
		}

		

		[HttpGet("PathToCategory/{id}")]
		public IActionResult GetCategoryPath(int id)
		{
			List<Category> path = new List<Category>();

			Category? category = _service.GetCategory(x => x.Id == id, "ParentCategory");
			if (category == null)
				return null;

			path.Add(category);

			while (category != null && category.ParentCategoryID != null)
			{
				category = _service.GetCategory(x => x.Id == category.ParentCategoryID, "ParentCategory");

				path.Insert(0, category);
			}
			
			if (path is not null)
			{
				return Ok(path);
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
