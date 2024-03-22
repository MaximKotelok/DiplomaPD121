﻿using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Repository.Repository.Interfaces;
using Services.ConcreteProductService;
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
        private readonly IProductService _productService;
        private readonly IPharmacyService _pharmacyService;

        public UserController(IUserService userService)
        {
            _userService = userService;
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
