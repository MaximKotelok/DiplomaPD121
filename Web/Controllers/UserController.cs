using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Repository.Repository.Interfaces;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;
using Services.UserService;
using System.Security.Claims;
using Utility;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IPharmaCompanyService _pharmaCompanyService;

        public UserController(IUserService userService, IPharmaCompanyService pharmaCompanyService)
        {
            _userService = userService;
            _pharmaCompanyService = pharmaCompanyService;
        }


        [HttpGet("getFavoriteProducts")]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<IActionResult> GetFavouriteProducts()
		{
			var user = await _userService.GetUserByName(User.Identity.Name);
            
            
			if (user == null)
			{
				return NoContent();
			}
			
			return Ok(user!.FavProducts!.Select(a => a.Id).ToList());
		}

        [HttpGet("getFavoritePharmacies")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetFavouritePharmacies()
        {
            var user = await _userService.GetUserByName(User.Identity.Name);


            if (user == null)
            {
                return NoContent();
            }

            return Ok(user!.FavPharmacies!.Select(a => a.Id).ToList());
        }

        [HttpGet("getFavoritePharmaciesWithSupInfo")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetFavouritePharmaciesWithSupInfo()
        {
            var user = await _userService.GetUserByName(User.Identity.Name);


            if (user == null)
            {
                return NoContent();
            }

            var pharmacies = user!.FavPharmacies;

            if (pharmacies == null)
            {
                return NoContent();
            }


            for (int i = 0; i < pharmacies.Count(); i++)
            {
                var pharmaCompany = _pharmaCompanyService.GetPharmaCompany(x => x.Id == pharmacies.ElementAt(i).PharmaCompanyID);

                pharmacies.ElementAt(i).PharmaCompany = pharmaCompany;
            }

            /*foreach (var pharmacy in pharmacies)
            {
                var pharmaCompany = _pharmaCompanyService.GetPharmaCompany(x => x.Id == pharmacy.PharmaCompanyID);

                list.Add(new
                {
                    Pharmacy = pharmacy,
                    PharmaCompany = pharmaCompany
                });
            }*/

            return Ok(pharmacies);
        }
        /*includeProperties: "Manufacturer,ProductConfirm,ProductConfirm.ProductStatus"*/

        [HttpPost("addFavouriteProduct/{productId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AddFavouriteProduct(int productId)
        {
            try
            {
                await _userService.AddFavouriteProduct(productId, User.Identity.Name);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("removeFavouriteProduct/{productId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> RemoveFavouriteProduct(int productId)
        {
            try
            {
                await _userService.RemoveFavouriteProduct(productId, User.Identity.Name);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addFavouritePharmacy/{pharmacyId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AddFavouritePharcmacy(int pharmacyId)
        {
            try
            {
                await _userService.AddFavouritePharmacy(pharmacyId, User.Identity.Name);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("removeFavouritePharmacy/{pharmacyId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> RemoveFavouritePharcmacy(int pharmacyId)
        {
            try
            {
                await _userService.RemoveFavouritePharmacy(pharmacyId, User.Identity.Name);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("ban/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public async Task<IActionResult> BanUser(string id)
        {
            try
            {
                await _userService.BanUser(id);
                return Ok();
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpPost("unban/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public async Task<IActionResult> UnbanUser(string id)
        {
            try
            {
                await _userService.UnbanUser(id);
                return Ok();
            }
            catch
            {
                return NoContent();
            }
        }
    }
}
