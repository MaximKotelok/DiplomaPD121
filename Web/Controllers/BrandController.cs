using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.ActiveSubstanceService;
using Services.BrandService;
using Services.CategoryService;
using System.Transactions;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BrandController : Controller
	{
		private readonly IBrandService _service;

		public BrandController(IBrandService service)
		{
			this._service = service;
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
    }
}
