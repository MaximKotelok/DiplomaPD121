using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Services.ProductConfirmService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductConfirmController : ControllerBase
	{
		private readonly IProductConfirmService _productConfirmService;


		public ProductConfirmController(IProductConfirmService productConfirmService)
		{
			this._productConfirmService = productConfirmService;
		}

		[HttpPost("")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_PharmaCompany)]
		public IActionResult GetAllRequests(PageViewModel model)
		{
			var rawResult =
				_productConfirmService.GetAllProductConfirm(includeProperties: "PharmaCompany,PharmaCompany.User,ProductStatus,Product,Product.Manufacturer,Product.Category");


			if (!model.Search.IsNullOrEmpty())
				rawResult =
				rawResult.Where(a =>
				{
					return a.Product.Title.StartsWith(model.Search) ||
					a.CreationDate.ToString("yyyy/MM/dd").StartsWith(model.Search) ||
					a.Product.Category.Title.StartsWith(model.Search) ||
					a.Product.Manufacturer.Name.StartsWith(model.Search) ||
					a.ProductStatus.Status.StartsWith(model.Search);
				});
			if (rawResult is not null)
			{
				rawResult = rawResult.Where(a => a.Product != null);
				int countOfPages = model.GetCountOfPages(rawResult.Count());
				int page = model.Page != null ? model.Page.Value - 1 : 0;
				var result = rawResult.Skip(model.ItemsPerPage * page).Take(model.ItemsPerPage)
					.OrderByDescending(a=>a.CreationDate)
					.Select(a =>
				new {
					Id = a.Product!.Id,
					Title = a.Product.Title,
					PathToPhoto = a.Product.PathToPhoto,
					Date = a.CreationDate.ToString("yyyy/MM/dd"),
					Manufacturer = a.Product!.Manufacturer!.Name,
					Category = a.Product.Category!.Title,
					Status = a.ProductStatus.Status!.ToString(),
					StatusColor = a.ProductStatus.Color,
					StatusId = a.ProductStatusID,
					PharmaCompany = a.PharmaCompany.Title,
					Email = a.PharmaCompany.User != null? a.PharmaCompany.User.Email:""
				}).GroupBy(a => a.PharmaCompany).Select(a => new { name = a.Key, data = a });
				return Ok(new { data = result, countOfPages });
			}
			return BadRequest("No records found");
		}
	}
}
