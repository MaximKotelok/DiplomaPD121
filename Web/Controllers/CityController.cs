using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.CategoryService;
using Services.CityService;
using Utility;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {

        private readonly ICityService _service;

        public CityController(ICityService service)
        {
            this._service = service;
        }

        [HttpGet("")]
        public IActionResult GetAllCitys()
        {
            var result = _service.GetAllCitys();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("{id}")]
        public IActionResult GetCity(int id)
        {
            var result = _service.GetCity(x => x.Id == id);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

		[HttpGet("Name/{cityName}")]
		public IActionResult GetCityByName(string cityName)
		{
			var result = _service.GetCity(x => x.NameCity == cityName);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetCityByStartOfTitle/{startOfTitle}")]
		public IActionResult GetCityByStartOfTitle(string startOfTitle)
		{
			var result = _service.GetAllCitys(a => a.NameCity!.StartsWith(startOfTitle));
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult AddCity(City city)
        {
            _service.InsertCity(city);
            return Ok("Data inserted");
        }

        [HttpPut("{id}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult UpdateCity(int id, City city)
        {
            city.Id = id;
            _service.UpdateCity(city);
            return Ok("Updation done");
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeleteCity(int id)
        {
            _service.DeleteCity(id);
            return Ok("Data Deleted");
        }
    }
}
