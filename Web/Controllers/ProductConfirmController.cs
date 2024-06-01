using Domain.Models;
using Domain.Models.CalculateActionModels;
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
using Services.UserService;
using System.Linq;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductConfirmController : ControllerBase
	{
		private readonly IProductConfirmService _productConfirmService;
		private readonly IUserService _userService;
		private readonly IPharmaCompanyService _pharmaCompanyService;


		public ProductConfirmController(IProductConfirmService productConfirmService
			, IUserService userService
			, IPharmaCompanyService pharmaCompanyService)
		{
			this._productConfirmService = productConfirmService;
			this._userService = userService;
			this._pharmaCompanyService = pharmaCompanyService;
		}

		[HttpPost("")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = $"{SD.Role_Admin},{SD.Role_PharmaCompany}")]
		public async Task<IActionResult> GetAllRequests(PageViewModel model)
		{
			int page = model.Page != null ? model.Page.Value - 1 : 0;
			int itemsPerPage = model.ItemsPerPage;
			int skipCount = page * itemsPerPage;

			var confirmsList = _productConfirmService.GetAllProductConfirm(includeProperties: "PharmaCompany,PharmaCompany.User,ProductStatus,Product,Product.Manufacturer,Product.Category")
				.OrderByDescending(a=>a.CreationDate)
				.GroupBy(a => a.PharmaCompany)
				.SelectMany(a =>
				a.Count() > 0 ?
				a.Select(confirm => new ProductConfirmAdminCalculateModel
				{
					PharmaCompany = a.Key,
					ProductConfirm = confirm
				}).Prepend(new ProductConfirmAdminCalculateModel { PharmaCompany = a.Key, IsTmp = true }) :
					new List<ProductConfirmAdminCalculateModel>
					{
					new ProductConfirmAdminCalculateModel
					{
						PharmaCompany = a.Key,
						ProductConfirm = null,
						IsTmp = true
					}
				});


			var user = await _userService.GetUserByName(User.Identity.Name);
			if ((await _userService.GetRolesAsync(user.Id)).Contains(SD.Role_PharmaCompany))
			{
				var pharmaCompany = _pharmaCompanyService.GetPharmaCompany(a => a.UserID == user.Id);
				if (pharmaCompany == null)
				{
					return StatusCode(403);
				}
				confirmsList = confirmsList.Where(a => a.PharmaCompany.Id == pharmaCompany.Id);
			}


				confirmsList = confirmsList.Where(a =>
					a.IsTmp == true ||
					a.ProductConfirm.Product.Title.Contains(model.Search, StringComparison.OrdinalIgnoreCase) ||
					a.ProductConfirm.CreationDate.ToString("yyyy/MM/dd").Contains(model.Search, StringComparison.OrdinalIgnoreCase) ||
					a.ProductConfirm.Product.Category.Title.Contains(model.Search, StringComparison.OrdinalIgnoreCase) ||
					a.ProductConfirm.Product.Manufacturer.Name.Contains(model.Search, StringComparison.OrdinalIgnoreCase) ||
					a.ProductConfirm.ProductStatus.Status.Contains(model.Search, StringComparison.OrdinalIgnoreCase)
				);
			

			int totalPages = model.GetCountOfPages(confirmsList.Count());

			var paginatedList = confirmsList.Skip(skipCount).Take(itemsPerPage).ToList();


			var result = paginatedList
			.GroupBy(a => a.PharmaCompany.Title)
				.Select(a => new
				{
						name = a.Key,
						data = a.Where(a => a.ProductConfirm != null).Select(b=> new{ 
						Id = b.ProductConfirm.Product.Id,
						Title = b.ProductConfirm.Product.Title,
						PathToPhoto = b.ProductConfirm.Product.PathToPhoto,
						Date = b.ProductConfirm.CreationDate.ToString("yyyy/MM/dd"),
						Manufacturer = b.ProductConfirm.Product.Manufacturer.Name,
						Category = b.ProductConfirm.Product.Category.Title,
						Status = b.ProductConfirm.ProductStatus.Status,
						StatusColor = b.ProductConfirm.ProductStatus.Color,
						StatusId = b.ProductConfirm.ProductStatusID,
						PharmaCompany = b.PharmaCompany.Title,
						Email = b.PharmaCompany.User != null ? b.PharmaCompany.User.Email : ""
					})
				}).ToList();


			return Ok(new { data = result, countOfPages = totalPages });


		}
	}
}
