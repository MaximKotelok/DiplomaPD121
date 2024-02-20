using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.ActiveSubstanceService;
using Services.BrandService;
using Services.CategoryService;
using Services.CountryService;
using System.Transactions;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CountryController : Controller
	{
		private readonly ICountryService _service;

		public CountryController(ICountryService service)
		{
			this._service = service;
		}

		[HttpGet("GetAllCountries")]
		public IActionResult GetAllBrands()
		{
			var result = _service.GetAllCountries();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}


        [HttpGet("GetCountryById")]
        public IActionResult GetAllBrands(int brandId)
        {
            var result = _service.GetCountry(x => x.Id == brandId);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }
    }
}
