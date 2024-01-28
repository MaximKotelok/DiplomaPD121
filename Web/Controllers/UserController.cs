using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Repository.Repository.Interfaces;
using Services.ConcreteProductService;
using Services.PharmacyService;
using Utility;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IProductService _productService;
        private readonly IPharmacyService _pharmacyService;


        public UserController(UserManager<User> userManager, IProductService productService, IPharmacyService pharmacyService)
        {
            _userManager = userManager;
            _productService = productService;
            _pharmacyService = pharmacyService;
        }

        [HttpPost("addFavouriteProduct/{productId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AddFavouriteProduct(int productId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var product = _productService.GetProduct(x => x.Id == productId);
            if (user == null || product == null)
            {
                return NoContent();
            }


            user.FavProducts = user.FavProducts?.Append(product).ToList();
            await _userManager.UpdateAsync(user);

            return Ok();
        }
        [HttpPost("removeFavouriteProduct/{productId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> RemoveFavouriteProduct(int productId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var product = _productService.GetProduct(x => x.Id == productId);

            if (user == null || product == null)
            {
                return NoContent();
            }

            if (user.FavProducts != null)
            {
                user.FavProducts = user.FavProducts.Where(p => p.Id != productId).ToList();
                await _userManager.UpdateAsync(user);
            }

            return Ok();
        }
        [HttpPost("addFavouritePharmacy/{pharmacyId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AddFavouritePharcmacy(int pharmacyId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var pharmacy = _pharmacyService.GetPharmacy(x => x.Id == pharmacyId);

            if (user == null || pharmacy == null)
            {
                return NoContent();
            }

            user.FavPharmacies = user.FavPharmacies?.Append(pharmacy).ToList();
            await _userManager.UpdateAsync(user);

            return Ok();
        }
        [HttpPost("removeFavouritePharmacy/{pharmacyId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> RemoveFavouritePharcmacy(int pharmacyId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var pharmacy = _pharmacyService.GetPharmacy(x => x.Id == pharmacyId);

            if (user == null || pharmacy == null)
            {
                return NoContent();
            }

            if (user.FavPharmacies != null)
            {
                user.FavPharmacies = user.FavPharmacies.Where(p => p.Id != pharmacyId).ToList();
                await _userManager.UpdateAsync(user);
            }

            return Ok();
        }


        [HttpPost("ban/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public async Task<IActionResult> BanUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user != null)
            {
                user.LockoutEnd = DateTime.MaxValue;
                await _userManager.UpdateAsync(user);
                return Ok();
            }
            return NoContent();
        }

        [HttpPost("unban/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public async Task<IActionResult> UnbanUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user != null)
            {
                user.LockoutEnd = null;
                await _userManager.UpdateAsync(user);
                return Ok();
            }
            return NoContent();
        }
    }
}
