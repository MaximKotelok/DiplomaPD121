using Domain.Models;
using Domain.Models.ViewModels;
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
            var favProducts = new List<int>(); // Create an empty list to store favorite product IDs

            // Check if user is authenticated
            if (!String.IsNullOrEmpty(User.Identity.Name))
            {
                var user = await _userService.GetUserByName(User.Identity.Name);

                if (user != null && user.FavProducts != null)
                {
                    favProducts = user.FavProducts.Select(a => a.Id).ToList();
                }
            }

            return Ok(favProducts);
        }

        [HttpGet("getMyInfo")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetMyInfo()
        {
            var user = await _userService.GetUserByName(User.Identity.Name);


            if (user == null)
            {
                return NoContent();
            }


            return Ok(new UserUpdateViewModel
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            });

        }

        [HttpPost("updateUser")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> UpdateUser(UserUpdateViewModel model)
        {
            var user = await _userService.GetUserByName(User.Identity.Name!);


            if (user == null)
            {
                return NoContent();
            }
            if (model.FirstName == "" ||
				model.LastName == "" ||
				model.PhoneNumber == "" ||
                model.Email == "")
            {
                return BadRequest("Всі поля мають бути заповнені");
            }

            await _userService.UpdateUser(user.Id, model.FirstName!, model.LastName!, model.PhoneNumber!, model.Email!);
			return Ok("Ваш профіль було успішно оновлено");
		}
        [HttpPost("changePassword")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> СhangePassword(ChangePasswordViewModel model)
        {
            var user = await _userService.GetUserByName(User.Identity.Name!);


            if (user == null)
            {
                return NoContent();
            }
            if (model.CurrentPassword == "" ||
				model.NewPassword == "")
            {
                return BadRequest("Всі поля мають бути заповнені");
            }
            try
            {
                await _userService.ChangePassword(user.Id, model.CurrentPassword, model.NewPassword);
            }catch (OperationCanceledException)
            {
				return BadRequest("Помилка");
			}
			return Ok("Ваш пароль було успішно оновлено");
		}

		[HttpGet("getFavoritePharmacies")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetFavouritePharmacies()
        {
            if (String.IsNullOrEmpty(User.Identity.Name))
                return Ok(null);

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
            if (String.IsNullOrEmpty(User.Identity.Name))
                return Ok(null);

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
