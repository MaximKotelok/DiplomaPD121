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

		[HttpPost("getFavorites")]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<IActionResult> GetFavorites()
		{
			var user = await _userManager.FindByNameAsync(User.Identity.Name);
            
            
			if (user == null)
			{
				return NoContent();
			}
			
			return Ok(user!.FavProducts!.Select(a => a.Id).ToList());
		}

		[HttpPost("addFavouriteProduct/{productId}")]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<IActionResult> AddFavouriteProduct(int productId)
		{
			var user = await _userManager.FindByNameAsync(User.Identity.Name);

			if (user == null)
			{
				return NotFound("User not found.");
			}

			var product = _productService.GetProduct(x => x.Id == productId);

			if (product == null)
			{
				return NotFound("Product not found.");
			}

			if (user.FavProducts != null && user.FavProducts.Any(p => p.Id == productId))
			{
				return BadRequest("Product is already in favorites.");
			}

			user.FavProducts = user.FavProducts.Append(product).ToList();

			try
			{			
				await _userManager.UpdateAsync(user);
				return Ok();
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error updating user: {ex.Message}");
				return StatusCode(500, "Internal Server Error");
			}
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
