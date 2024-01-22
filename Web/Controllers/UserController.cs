using AutoMapper;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Repository.Repository.Interfaces;
using Azure;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;
using Utility;
using Services.ConcreteProductService;
using Services.SimilarProductGroupService;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<User> _userManager;

        public UserController(UserManager<User> userManager, IUserService userService)
        {
            _userManager = userManager;
            _userService = userService;
        }

        /*[HttpGet("id")]
            [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> ClaimUserId()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return Ok(user.Id);
        }*/

        [HttpPost("addFavouriteProduct/{productId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AddFavouriteProduct(int productId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return NoContent();
            }

            _userService.AddFavouriteProduct(user, productId);
            return Ok();
        }
        [HttpPost("addFavouriteProduct/{pharmacyId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AddFavouritePharcmacy(int pharmacyId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return NoContent();
            }

            _userService.AddFavouriteProduct(user, pharmacyId);
            return Ok();
        }

        [HttpPost("addFavouriteProduct/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public async Task<IActionResult> BanUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NoContent();
            }

            _userService.BanUser(user);
            return Ok();
        }
    }
}
