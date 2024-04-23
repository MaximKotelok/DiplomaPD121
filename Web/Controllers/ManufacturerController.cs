using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.ActiveSubstanceService;
using Services.CategoryService;
using Services.ConcreteProductService;
using Services.ManufacturerService;
using System.Transactions;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ManufacturerController : Controller
	{
		private readonly IManufacturerService _service;
        private readonly IProductService _productService;


        public ManufacturerController(IManufacturerService service, IProductService productService)
		{
			this._service = service;
			this._productService = productService; 
		}

		[HttpGet("GetAllManufacturers")]
		public IActionResult GetAllManufacturers()
		{
			var result = _service.GetAllManufacturers();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}
        [HttpPost("GetAllManufacturersForAdmin")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult GetAllBrandsForAdmin(PageViewModel model)
        {
            var rawResult = _service.GetAllManufacturers(includeProperties: "CountryManufacture");
            if (!model.Search.IsNullOrEmpty())
            {
                rawResult = rawResult.Where(a =>
                {
                    return
                    a.Id.ToString().StartsWith(model.Search) ||
                    a.Name.StartsWith(model.Search);
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

        [HttpGet("GetManufacturerById")]
		public IActionResult GetManufacturer(int manufacturerId)
		{
			var result = _service.GetManufacturer(x => x.Id == manufacturerId);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}


        [HttpPost("UpsertManufacturer")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult UpsertManufacturer(PostManufacturerViewModel postModel)
        {
            using var transaction = new TransactionScope();
            try
            {
                UpsertManufacturerEntity(postModel);

                transaction.Complete();
                return Ok("Data inserted");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to upsert product. Error: {ex.Message}");
            }
        }

        [HttpDelete("DeleteManufacturer/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeleteManufacturer(int id)
        {
            using var transaction = new TransactionScope();

            var brand = _service.GetManufacturer(a => a.Id == id, "Products");
            if (brand != null)
            {
                foreach (var item in brand.Products)
                {
                    _productService.DeleteProduct(item.Id);
                }
                _service.DeleteManufacturer(id);
            }

            transaction.Complete();
            return Ok("Data Deleted");
        }

        private void UpsertManufacturerEntity(PostManufacturerViewModel postModel)
        {
            var manufacturer = new Manufacturer
            {
                Name = postModel.Name,
                Address = postModel.Address,
                URLSite = postModel.URLSite,
                CountryManufactureID = postModel.CountryID,
            };


            if (postModel.Id == null)
            {
                _service.InsertManufacturer(manufacturer);
            }
            else
            {
                manufacturer.Id = postModel.Id.Value;
                _service.UpdateManufacturer(manufacturer);
            }
        }
    }
}
