using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.ActiveSubstanceService;
using Services.BrandService;
using Services.CategoryService;
using Services.ConcreteProductService;
using System.Transactions;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BrandController : Controller
	{
		private readonly IBrandService _service;
		private readonly IProductService _productService;

        public BrandController(IBrandService service, IProductService productService)
		{
			this._service = service;
            this._productService = productService;

        }

		[HttpGet("GetRecomendedBrands")]
		public IActionResult GetRecomendedBrands(int count)
		{
			var result = _service.GetAllBrands().Take(count);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetAllBrands")]
		public IActionResult GetAllBrands()
		{
			var result = _service.GetAllBrands();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

        [HttpPost("GetAllBrandsForAdmin")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult GetAllBrandsForAdmin(PageViewModel model)
        {
            var rawResult = _service.GetAllBrands(includeProperties: "CountryBrand");
            if (!model.Search.IsNullOrEmpty())
            {
                rawResult = rawResult.Where(a =>
                {
                    return
                    a.CountryBrand.Name.Contains(model.Search, StringComparison.OrdinalIgnoreCase) ||
                    a.Id.ToString().Contains(model.Search, StringComparison.OrdinalIgnoreCase) ||
                    a.Name.Contains(model.Search, StringComparison.OrdinalIgnoreCase);
                });
            }
            if (rawResult is not null)
            {
                int page = model.Page != null ? model.Page.Value - 1 : 0;
                var result = rawResult.Skip(model.ItemsPerPage * page).Take(model.ItemsPerPage)
                    .Select(a => a);
                int countOfPages = model.GetCountOfPages(rawResult.Count());
                return Ok(new { data = result, countOfPages });
            }
            return BadRequest("No records found");
        }   

        [HttpGet("GetBrandById")]
        public IActionResult GetBrandById(int brandId)
        {
            var result = _service.GetBrand(x=> x.Id == brandId);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpPost("UpsertBrand")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult UpsertBrand(PostBrandViewModel postModel)
        {
            using var transaction = new TransactionScope();
            try
            {
                UpsertBrandEntity(postModel);

                transaction.Complete();
                return Ok("Data inserted");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to upsert product. Error: {ex.Message}");
            }
        }

        private void UpsertBrandEntity(PostBrandViewModel postModel)
        {
            var brand = new Brand
            {
                Name = postModel.Name,
                Description = postModel.Description,
                CountryBrandID = postModel.CountryID,
                PathToPhoto = postModel.PathToPhoto,
            };


            if (postModel.Id == null)
            {
                _service.InsertBrand(brand);
            }
            else
            {
                brand.Id = postModel.Id.Value;
                _service.UpdateBrand(brand);
            }
        }

        [HttpDelete("DeleteBrand/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeleteBrand(int id)
        {
            using var transaction = new TransactionScope();

            var brand = _service.GetBrand(a => a.Id == id, "Products");
            if (brand != null)
            {
                foreach (var item in brand.Products)
                {
                    _productService.DeleteProduct(item.Id);
                }
                _service.DeleteBrand(id);
            }

            transaction.Complete();
            return Ok("Data Deleted");
        }
    }
}
