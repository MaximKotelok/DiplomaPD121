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
		public IActionResult GetAllRequests(ConfirmProductPageViewModel model)
		{
			var rawResult = _productConfirmService.GetAllProductConfirm(includeProperties: "PharmaCompany,ProductStatus,Product,Product.Manufacturer,Product.Category");
			if (rawResult is not null)
			{
				rawResult = rawResult.Where(a => a.Product != null);
				int countOfPages = (int)Math.Round(Convert.ToDouble(rawResult.Count()) / Convert.ToDouble(model.ProductPerPage));
				int page = model.Page != null ? model.Page.Value - 1 : 0;
				var result = rawResult.Skip(model.ProductPerPage * page).Take(model.ProductPerPage).Select(a =>
				new {
					Id = a.Product!.Id,
					Title = a.Product.Title,
					PathToPhoto = a.Product.PathToPhoto,
					Date = a.CreationDate.ToString("yyyy/MM/dd"),
					Manufacturer = a.Product!.Manufacturer!.Address,
					Category = a.Product.Category!.Title,
					Status = a.ProductStatus.Status!.ToString(),
					StatusColor = a.ProductStatus.Color,
					StatusId = a.ProductStatusID,
					PharmaCompany = a.PharmaCompany.Title
				}).GroupBy(a => a.PharmaCompany).Select(a => new { name = a.Key, data = a });
				return Ok(new { data = result, countOfPages });
			}
			return BadRequest("No records found");
		}
	}
}
