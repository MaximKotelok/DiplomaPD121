using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.CategoryService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;
using Services.SimilarProductGroupService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SimilarProductGroupController : ControllerBase
	{
		private readonly ISimilarProductGroupService _similarService;
		private readonly IProductService _productService;

		public SimilarProductGroupController(ISimilarProductGroupService similarService, IProductService productService)
		{
			this._similarService = similarService;
			this._productService = productService;
		}

		[HttpGet("")]
		public IActionResult GetAllGroups()
		{
			var result = _similarService.GetAllSimilarProductGroups();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("/GetAllSimilarProductsFromGroup/{id}")]
		public IActionResult GetAllSimilarProductsFromGroup(int id)
		{
			var result = _similarService.GetSimilarProductGroup(a => a.Id == id, "Products");
			if (result is not null)
			{
				return Ok(
					new SimilarViewModel
					{
						Name = result.Name,
						SimilarBy = result.SimilarBy,
						Products = result.Products.Select(a => 
						new ProductViewModel { 
							Id= a.Id, 
							CategoryID=a.CategoryID, 
							Description=a.ShortDescription, 
							PathToPhoto=a.PathToPhoto, 
							SimilarGroupId=a.SimilarProductGroupId, 
							Title=a.Title})
					}
					);
			}
			return BadRequest("Pharmacy not found");
		}

		[HttpPost()]
		public IActionResult CreateNewGroup(SimilarViewModel viewModel)
		{
			SimilarProductGroup group = new SimilarProductGroup
			{
				Name = viewModel.Name,
				SimilarBy = viewModel.SimilarBy,
				Products = new List<Product>()
			};


            foreach (var item in viewModel.Products)
            {
				var product = _productService.GetProduct(a => a.Id == item.Id);
				if(product is not null)
				{

				product.SimilarProductGroup = group;
				group.Products.Prepend(product);
				}
            }

			_similarService.InsertSimilarProductGroup(group);
			return Ok("Data inserted");
		}


		[HttpPost("AddProductToGroup")]
		public IActionResult AddProductToGroup(int productId, int groupId)
		{
			if (_similarService.GetSimilarProductGroup(a => a.Id == groupId) != null)
			{
				var res = _productService.GetProduct(a => a.Id == productId);
				res.SimilarProductGroupId = groupId;
				_productService.UpdateProduct(res);
				return Ok("Data inserted");
			}
			return BadRequest("Group not found");
		}

		[HttpPut("{id}")]
		public IActionResult UpdateGroup(int id, SimilarProductGroup group)
		{
			_similarService.UpdateSimilarProductGroup(group);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteGroup(int id)
		{
			_similarService.DeleteSimilarProductGroup(id);
			return Ok("Data Deleted");
		}
	}
}
