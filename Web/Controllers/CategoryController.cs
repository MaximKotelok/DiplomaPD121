using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.CategoryService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
		private readonly ICategoryService _service;
		private readonly IProductService _productService;

        public CategoryController(ICategoryService service, IProductService productService)
		{
			this._service = service;
			this._productService = productService;
		}

		[HttpGet("GetBottomCategoryById")]
		public IActionResult GetBottomCategoryById(int id, int count)
		{
			var result = _service.GetCategory(a =>
				a.Id == id, includeProperties: "SubCategories");

			if (result is not null)
			{
				return Ok(new { result = result!.SubCategories!.Take(count), id });
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetBottomCategory")]  // GetBottomCategory
		public IActionResult GetBottomCategory(int count)
		{
			var result = _service.GetAllCategories(a =>
				(a.IsDisplayOnBottom != null && a.IsDisplayOnBottom.Value));


			if (result is not null && result.Count() > 0)
			{
				var randomId = result.ElementAt(new Random().Next(0, result.Count())).Id;
				var randomRes = _service!.GetCategory(a => a.Id == randomId,
					includeProperties: "SubCategories")!.SubCategories!.Take(count);
				return Ok(new { result = randomRes, id = randomId });
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetRecomendedCategories")]  
		public IActionResult GetRecomendedCategories(int count)
		{
			var result = _service.GetAllCategories(a =>
				(a.IsRecomended != null && a.IsRecomended.Value)).TakeLast(count);


			if (result is not null && result.Count() > 0)
			{
				return Ok(result);
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

		[HttpGet("GetById")]
		public IActionResult GetById(int? id)
		{
			var result = _service.GetCategory(x => x.Id == id, "Products,SubCategories,SubCategories.Products");

			if (result is not null)
			{
				int count = 0;
				if(!result.SubCategories.IsNullOrEmpty())
				{
					count = result.SubCategories!.Count(a => !a.Products.IsNullOrEmpty());
                }
				return Ok(new { Title = result.Title, SubCategories = result!.SubCategories, Count = count});
			}
			return BadRequest("No records found");
		}
        [HttpGet("GetByIdForAdmin")]
        public IActionResult GetByIdForAdmin(int? id)
        {
            var result = _service.GetCategory(x => x.Id == id, "Products,SubCategories,SubCategories.Products");

            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("GetByIdForMenu")]
		public IActionResult GetByIdForMenu(int? id, int count)
		{
			var result = _service.GetCategory(x => x.Id == id, "SubCategories,SubCategories.SubCategories");
			result.SubCategories = result.SubCategories.Take(6);

			foreach (var item in result.SubCategories)
            {
				item.SubCategories = item.SubCategories.Take(count);
            }
            if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		//*********
		[HttpGet("GetWithProducts")]
		public IActionResult GetWithProducts(int? id, int from, int to, int count)
		{
			int maxNumber = to - from;
			if (maxNumber <= 0)
				return BadRequest("Incorrect datas");
			var result = _service.GetCategory(x => x.Id == id, "SubCategories,SubCategories.Products");

			if (result is not null)
			{
				var categories = result.SubCategories.Where(a => !a.Products.IsNullOrEmpty()).Skip(from)
					.Take(maxNumber).Select(a => new { Id=a.Id, Title=a.Title, Products = a.Products.Take(count) });



				return Ok(categories);
			}
			return BadRequest("No records found");
		}

		[HttpGet("IsCategoryHasProducts")]
		public IActionResult IsCategoryHasProducts(int? id)
		{
			
			var result = _service.GetCategory(x => x.Id == id);

			if (result is not null)
			{
				

				return Ok(result.CanHasProducts == true);
			}
			return BadRequest("No records found");
		}

		//**********
		[HttpGet("GetCategoryProductsForFilter")]
		public IActionResult GetCategoryProductsForFilter(int? id, int from, int to)
		{
			int maxNumber = to - from;
			if (maxNumber <= 0)
				return BadRequest("Incorrect datas");
			var result = _service.GetCategory(x => x.Id == id, "Products,Products.Manufacturer,Products.Properties,Products.Properties.Attribute");

			if (result is not null)
			{
				var products = result.Products.Skip(from).Take(maxNumber)
					.Select(a=>new {
						a.Id,
						a.Title,
						a.PathToPhoto,
						ManufacturerName = a.Manufacturer.Name,
						a.ShortDescription,
						Properties=a.Properties
						.Select(b =>new { b.Attribute.Name, b.Value})
					});;


				return Ok(products);
			}
			return BadRequest("No records found");
		}

		[HttpGet("Main/All")]
		public IActionResult GetAllMainCategories(int count)
		{
			var result = _service.GetCategory(x => x.ParentCategory == null, "SubCategories");
			if (result is not null)
			{
				return Ok(result!.SubCategories!.Take(count));
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetCategoriesForProductAdd")]
		public IActionResult GetCategoriesForProductAdd()
		{
			var result = _service.GetAllCategories();
			if (result is not null)
			{
				return Ok(result);
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
			var result = _service.GetCategory(x => x.Id == id);
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
			IEnumerable<Category> categories = new List<Category>();
			if (category is not null)
				categories = category?.SubCategories!;

			return Ok(categories);

		}
		[HttpGet("GetProductsFromCategory")]
		public IActionResult GetProductsFromCategory(int id, int count)
		{
			var category = _service.GetCategory(a => a.Id == id, "Products");
			IEnumerable<Product> products = new List<Product>();
			if (category is not null)
				products = category?.Products!.Take(count);

			return Ok(products);

		}

		[HttpPost("GetCountOfPagesAllCategoriesForAdmin")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult GetCountOfPagesAllCategoriesForAdmin(PageViewModel model)
		{
			var catalogue = _service.GetCategory(a => a.ParentCategoryID == null);
			var rawResult = _service.GetAllCategories(a =>
			a.ParentCategoryID != null && a.ParentCategoryID != catalogue!.Id
			);
			if (!model.Search.IsNullOrEmpty())
			{
				rawResult = rawResult.Where(a =>
				{
					return
					a.Id.ToString().Contains(model.Search, StringComparison.OrdinalIgnoreCase) ||
					a.Title.Contains(model.Search, StringComparison.OrdinalIgnoreCase);
				});
			}
			if (rawResult is not null)
			{
				int countOfPages = model.GetCountOfPages(rawResult.Count());
				return Ok(countOfPages);
			}
			return BadRequest("No records found");
		}

		[HttpPost("GetAllCategoriesForAdmin")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult GetAllCategoriesForAdmin(PageViewModel model)
        {
			int page = model.Page != null ? model.Page.Value - 1 : 0;
			var catalogue = _service.GetCategory(a => a.ParentCategoryID == null);
            var result = _service.GetAllCategories(a =>
			a.ParentCategoryID != null && a.ParentCategoryID != catalogue!.Id
			)
			.OrderByDescending(a=>a.Id)
			.Where(a =>
			{
				return
				a.Id.ToString().Contains(model.Search, StringComparison.OrdinalIgnoreCase) ||
				a.Title.Contains(model.Search, StringComparison.OrdinalIgnoreCase);
			})
			.Skip(model.ItemsPerPage * page).Take(model.ItemsPerPage)
					.Select(a => a);

            if (result is not null)
            {                
                return Ok(result);
            }
            return BadRequest("No records found");
        }
		[HttpGet("GetAllCategoriesCanHasCategories")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = $"{SD.Role_PharmaCompany},{SD.Role_Admin}")]
		public IActionResult GetAllCategoriesCanHasCategories()
        {
			var result = _service.GetAllCategories(a => a.CanHasProducts == null || !a.CanHasProducts.Value);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetAllCategoriesCanHasProducts")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = $"{SD.Role_PharmaCompany},{SD.Role_Admin}")]
		public IActionResult GetAllCategoriesCanHasProducts()
		{
			var result = _service.GetAllCategories( a => a.CanHasProducts == true);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}


		[HttpGet("PathToCategory")]
		public IActionResult GetCategoryPath(int id)
		{
			List<Category> path = new List<Category>();

			Category? category = _service.GetCategory(x => x.Id == id, "ParentCategory");
			if (category == null)
				return BadRequest("Category not found"); ;

			path.Add(category);

			while (category != null && category.ParentCategoryID != null)
			{
				category = _service.GetCategory(x => x.Id == category.ParentCategoryID, "ParentCategory");

				path.Insert(0, category!);
			}

			if (path is not null)
			{
				return Ok(path);
			}
			return BadRequest("No records found");
		}
        [HttpPost("UpsertCategory")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult UpsertCategory(PostCategoryViewModel postModel)
        {
            using var transaction = new TransactionScope();
            try
            {
                UpsertCategoryEntity(postModel);

                transaction.Complete();
                return Ok("Data inserted");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to upsert category. Error: {ex.Message}");
            }
        }

        private void UpsertCategoryEntity(PostCategoryViewModel postModel)
        {
            var category = new Category
            {
                Title = postModel.Title,
                ParentCategoryID = postModel.ParentCategoryID,
                IsRecomended = postModel.IsRecomended,
                PathToPhoto = postModel.PathToPhoto,
                PathToRecomendedPhoto = postModel.PathToRecomendedPhoto,
				CanHasProducts = postModel.CanHasProducts
			};
			
			if(_service.GetCategory(a => a.Id == postModel.ParentCategoryID).CanHasProducts == true)
			{
				throw new Exception($"Parent category can has only products");
			}

			if (postModel.Id == null)
			{
				_service.InsertCategory(category);
			}
			else
			{
				if (postModel.Id.Value == postModel.ParentCategoryID)
				{
					throw new Exception("This category can't be parent category");
				}
				if (postModel.CanHasProducts != null && postModel.CanHasProducts.Value)
				{
                    foreach (var item in _service.GetAllCategories(a => a.ParentCategoryID == postModel.Id))
                    {
						_service.DeleteCategory(item.Id);
                    }
				}
				else
				{
					foreach (var item in _productService.GetAllProducts(a=>a.CategoryID == postModel.Id))
					{
		
						_productService.DeleteProduct(item.Id);
			
					}
				}
				category.Id = postModel.Id.Value;
                _service.UpdateCategory(category);
            }
        }

		[HttpDelete("DeleteCategory/{id}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult DeleteCategory(int id)
		{
            using var transaction = new TransactionScope();

            var category = _service.GetCategory(a => a.Id == id, "Products,SubCategories");
            if (category != null)
            {
                foreach (var item in category.SubCategories)
                {
					DeleteCategory(item.Id);
                }
                foreach (var item in category.Products)
                {
                    _productService.DeleteProduct(item.Id);
                }
                _service.DeleteCategory(id);
            }

            transaction.Complete();
            return Ok("Data Deleted");
        }
	}
}
