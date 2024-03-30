using Domain.Dto;
using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Repository.Repository.Interfaces;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;
using Services.UserService;
using Utility;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PharmacyController : ControllerBase
    {
        private readonly IPharmacyService _pharmacyService;
        private readonly ICityService _cityService;

        public PharmacyController(IPharmacyService service, ICityService _cityService)
        {
            this._pharmacyService = service;
            this._cityService = _cityService;
        }

        [HttpGet("")]
        public IActionResult GetAllPharmacies()
        {
            var result = _pharmacyService.GetAllPharmacies();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("/GetAllConcreteProductsFromPharmacy/{id}")]
        public IActionResult GetAllConcreteProductsFromPharmacy(int id)
        {
            var result = _pharmacyService.GetPharmacy(a => a.Id == id, "ConcreteProducts");
            if (result is not null)
            {
                return Ok(result.ConcreteProducts);
            }
            return BadRequest("Pharmacy not found");
        }

        [HttpGet("GetPharmacyProduct")]
        public IActionResult GetPharmacyProduct(int id, int productId)
        {
            var result = _pharmacyService.GetPharmacy(x => x.Id == id, "ConcreteProducts,ConcreteProducts.Product")?.ConcreteProducts;
            if (result is not null)
            {
                var product = result.First(a => a.Id == productId);
                return Ok(product);
            }
            return BadRequest("No records found");
        }

		[HttpGet("{id}")]
		public IActionResult GetPharmacy(int id)
		{	
			var result = _pharmacyService.GetPharmacy(x => x.Id == id, "PharmaCompany");
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}
		[HttpGet("GetPharmacist/{id}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult GetPharmacist(int id)
		{
			var result = _pharmacyService.GetPharmacy(a => a.Id == id, "User");
			if (result is not null && result.User is not null)
			{
				return Ok(new PharmacistViewModel { PharmacyId=id, Email=result.User.Email, Username=result.User.UserName});
			}
			return Ok(new PharmacistViewModel { PharmacyId=id});
			
		}

		[HttpGet("Coords/{latitude}/{longitude}")]

        public IActionResult GetPharmacyByCoords(string latitude, string longitude)
        {
            var result = _pharmacyService.GetPharmacy(x => x.Latitude == latitude && x.Longitude == longitude);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("GetListOfPharmacyInYourCity/{cityName}")]
        public IActionResult GetListOfPharmacyInYourCity(string cityName)
        {
            var city = _cityService.GetCity(a => a.NameCity == cityName);
            if (city is not null)
            {
                var result = _pharmacyService.GetAllPharmacies(a => a.CityID == city.Id, "PharmaCompany");

                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("GetListOfPharmacyInYourCityByCompany/{cityName}/{companyId}")]
        public IActionResult GetListOfPharmacyInYourCity(string cityName, int companyId)
        {
            var city = _cityService.GetCity(a => a.NameCity == cityName);
            if (city is not null)
            {
                var result = _pharmacyService.GetAllPharmacies(a => a.CityID == city.Id && a.PharmaCompanyID == companyId, "PharmaCompany");

                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpPost("UpsertPharmacy")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public async Task<IActionResult> UpsertBrand(PostPharmacyViewModel postModel)
        {
            /*using var transaction = new TransactionScope();*/
            try
            {
                

                
                return Ok(await UpsertPharmacyEntity(postModel));
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to upsert product. Error: {ex.Message}");
            }
        }

		[HttpPost("UpsertPharmacist")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public async Task<IActionResult> UpsertPharmacist(PharmacistViewModel postModel)
		{			
			try
			{
				var pharmacy = _pharmacyService.GetPharmacy(a => a.Id == postModel.PharmacyId, "User");

				if (pharmacy != null)
				{
					if(pharmacy.UserID == null)
					{

					var user = new UserRegistrationDto
					{
						UserName = postModel.Username,
						Password = postModel.Password,
						Email = postModel.Email,
					};

					user.Roles = new List<string>
					{
						SD.Role_Pharmacist
					};
									
					if ((await _repository.UserAuthentication.RegisterUserAsync(user)).Succeeded)
					{
						User registrationResult = await _userService.GetUserByName(postModel.Username);

						pharmacy.UserID = registrationResult.Id;
						_pharmacyService.UpdatePharmacy(pharmacy);
						return Ok("Data inserted");
					}
					}

					else
					{
						/*_userService.UpdateUser()
						await _repository.UserAuthentication.RegisterUserAsync(user);
						pharmacy.Id = postModel.Id.Value;
						_pharmacyService.UpdatePharmacy(pharmacy);*/ //Update pharmacist code
					}
				}
				return BadRequest($"Failed to upsert user");

				/* transaction.Complete();*/

			}
			catch (Exception ex)
			{
				return BadRequest($"Failed to upsert product. Error: {ex.Message}");
			}
		}


		[HttpDelete("{id}")]
                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeletePharmacy(int id)
		{
			_pharmacyService.DeletePharmacy(id);
			return Ok("Data Deleted");
		}

		

        private async Task<int> UpsertPharmacyEntity(PostPharmacyViewModel postModel)
        {
            var pharmacy = new Pharmacy
            {
				Address = postModel.Address,
				WorkingWeekOpenTime = postModel.WorkingWeekOpenTime,
				WorkingWeekCloseTime = postModel.WorkingWeekCloseTime,
				WeekendOpenTime = postModel.WeekendOpenTime,
				WeekendCloseTime = postModel.WeekendCloseTime,
				Longitude = postModel.Longitude,
				Latitude = postModel.Latitude,
				PharmaCompanyID = postModel.PharmaCompanyID,
				CityID = postModel.CityID,
            };

			if (postModel.Id == null)
			{
				_pharmacyService.InsertPharmacy(pharmacy);
				return pharmacy.Id;
			}
			else
			{
				pharmacy.Id = postModel.Id.Value;
				_pharmacyService.UpdatePharmacy(pharmacy);
				return postModel.Id.Value;
			}
        }

    }
}
