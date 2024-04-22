using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.ActiveSubstanceService;
using Services.CategoryService;
using Services.ManufacturerService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ManufacturerController : Controller
	{
		private readonly IManufacturerService _service;

		public ManufacturerController(IManufacturerService service)
		{
			this._service = service;
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

	}
}
