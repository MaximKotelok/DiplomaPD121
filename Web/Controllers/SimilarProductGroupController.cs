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
using Services.SimilarProductItemService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SimilarProductGroupController : ControllerBase
	{
		private readonly ISimilarProductGroupService _similarService;
		private readonly ISimilarProductItemService _similarProductItemService;
		private readonly IProductService _productService;

		public SimilarProductGroupController(ISimilarProductGroupService similarService, IProductService productService, ISimilarProductItemService similarProductItemService)
		{
			this._similarService = similarService;
			this._productService = productService;
			this._similarProductItemService = similarProductItemService;
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
			var result = _similarService.GetSimilarProductGroup(a => a.Id == id, "Similar,Similar.Product");
			if (result is not null)
			{
				return Ok(
					new SimilarViewModel
					{
						Name = result.Name,
						SimilarBy = result.SimilarBy,
						Products = result!.Similar!.Select(a => 
						new SimilarProductViewModel {
							ProductId = a.Id, 
							TitleOfSimilar=a.Title}
						)
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
				Similar = new List<SimilarProductItem>()
			};


            foreach (var item in viewModel!.Products!)
            {
				var product = _productService.GetProduct(a => a.Id == item.ProductId, includeProperties: "SimilarProductItems");
				if(product is not null)
				{
					var newSimilar = new SimilarProductItem
					{
						ProductID = product.Id,
						SimilarProductGroup = group
					};
					product.SimilarProductItems!.Append(newSimilar);
				
					group.Similar.Prepend(newSimilar);
				}
            }

			_similarService.InsertSimilarProductGroup(group);
			return Ok("Data inserted");
		}


		[HttpPost("AddProductToGroup")]
		public IActionResult AddProductToGroup(int productId, int groupId, string title)
		{
			if (_similarService.GetSimilarProductGroup(a => a.Id == groupId) != null)
			{
				_similarProductItemService.InsertSimilarProductItem(
					new SimilarProductItem { SimilarProductGroupId = groupId, ProductID=productId, Title= title }
					);
				return Ok("Data inserted");
			}
			return BadRequest("Group not found");
		}
		
		[HttpDelete("RemoveProductFromGroup")]
		public IActionResult RemoveProductFromGroup(int productId, int groupId)
		{
			var res = _similarProductItemService.GetSimilarProductItem(a => a.SimilarProductGroupId == groupId && a.ProductID == productId);

			if(res != null)
			{
				_similarProductItemService.DeleteSimilarProductItem(res.Id);
				return Ok("Data removed");
			}

			return BadRequest("Not found");
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
