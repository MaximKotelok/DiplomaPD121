using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Utility;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConcreteProductController : ControllerBase
    {
        private readonly IConcreteProductService _concreteProductService;
        private readonly ICityService _cityService;


        public ConcreteProductController(IConcreteProductService concreteProductService, ICityService cityService)
        {
            this._concreteProductService = concreteProductService;
            this._cityService = cityService;
        }

        [HttpGet("")]
        public IActionResult GetAllConcreteProducts()
        {
            var result = _concreteProductService.GetAllConcreteProducts();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("GetSupInfoForProductInYourCity")]
        public IActionResult GetSupInfoForProductInYourCity(string city, int id)
        {
            var result = _concreteProductService.GetAllConcreteProducts(a => a.ProductID == id
            &&
            a.Pharmacy!.City!.NameCity == city && a.Quantity > 0, "Pharmacy,Pharmacy.City");
            if (!result.IsNullOrEmpty())
            {
                return Ok(new { minPrice = result.Min(a => a.Price), count = result.Count() });
            }
            return Ok(new { minPrice = 0.0, count = 0 });
        }

        [HttpGet("GetListOfConcreteProductInYourCity/{cityName}/{productId}")]
        public IActionResult GetListOfConcreteProductInYourCity(string cityName, int productId)
        {
            var cityRes = _cityService.GetCity(a => a.NameCity == cityName);
            if (cityRes is not null)
            {
                var result = _concreteProductService.GetAllConcreteProducts(
                  a => a.ProductID == productId
                  &&
                  a.Pharmacy.CityID == cityRes.Id, "Pharmacy,Product,Product.Manufacturer,Pharmacy.PharmaCompany");

                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("Coords/{latitude}/{longitude}/{productId}")]

        public IActionResult GetProductByCoords(string latitude, string longitude, int productId)
        {
            var result = _concreteProductService.GetConcreteProduct(x => x.ProductID == productId
            && x.Pharmacy.Latitude == latitude
            && x.Pharmacy.Longitude == longitude);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("{id}")]
        public IActionResult GetConcreteProduct(int id)
        {
            var result = _concreteProductService.GetConcreteProduct(x => x.Id == id);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("Search/{pharmacyId}/{title}")]
        public IActionResult SearchConcreteProductByPharmacy(int pharmacyId, string title)
        {
            var result = _concreteProductService.GetAllConcreteProducts(x => x.PharmacyID == pharmacyId && x.Product!.Title!.StartsWith(title), "Product");
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Pharmacist)]
        public IActionResult AddConcreteProduct(ConcreteProduct concreteProduct)
        {
            _concreteProductService.InsertConcreteProduct(concreteProduct);
            return Ok("Data inserted");
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Pharmacist)]
        public IActionResult UpdateConcreteProduct(int id, ConcreteProduct concreteProduct)
        {
            concreteProduct.Id = id;
            _concreteProductService.UpdateConcreteProduct(concreteProduct);
            return Ok("Updation done");
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Pharmacist)]
        public IActionResult DeleteConcreteProduct(int id)
        {
            _concreteProductService.DeleteConcreteProduct(id);
            return Ok("Data Deleted");
        }
    }
}
