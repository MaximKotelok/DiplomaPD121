﻿using DataAccess.Migrations;
using Domain.Dto;
using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using Repository.Repository.Interfaces;
using Services.ConcreteProductService;
using Services.PharmacyService;
using Services.SimilarProductGroupService;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.UserService
{
	public class UserService : IUserService
	{
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> _userManager;
        private readonly IProductService _productService;
        private readonly IPharmacyService _pharmacyService;

        public UserService(Microsoft.AspNetCore.Identity.UserManager<User> userManager, IProductService productService, IPharmacyService pharmacyService)
		{
            _userManager = userManager;
            _productService = productService;
            _pharmacyService = pharmacyService;
        }

		public async Task UpdateUser(string id, string? firstName = "", string? lastName = "", string? phoneNumber = "", string? email="", string? userName="")
		{
			var user = await _userManager.FindByIdAsync(id);
            if(firstName != "")
                user.FirstName = firstName;
			if (lastName != "")
				user.LastName = lastName;
			if (phoneNumber != "")
				user.PhoneNumber = phoneNumber;
			if (email != "")
				user.Email = email;
			if (userName != "")
				user.UserName = userName;
			await _userManager.UpdateAsync(user);
		}


		public async Task<bool> ChangePasswordWithoutConfirmAsync(string id, string newPassword)
		{
			var user = await _userManager.FindByIdAsync(id);

			if (user == null)
			{
                return false;
			}

			var token = await _userManager.GeneratePasswordResetTokenAsync(user);

			var result = await _userManager.ResetPasswordAsync(user, token, newPassword);
            
			return result.Succeeded;
		}

		public async Task UpdatePhoto(string id, string newPath)
        {

			var user = await _userManager.FindByIdAsync(id);
			if (newPath != "")
				user.PathToPhoto = newPath;
            else
                throw new ArgumentException("Cannot set empty string as path to photo");
			await _userManager.UpdateAsync(user);
		}
		public async Task ChangePassword(string id, string currentPassword, string newPassword)
		{
			var user = await _userManager.FindByIdAsync(id);
			if(!(await _userManager.ChangePasswordAsync(user, currentPassword, newPassword)).Succeeded)
            {
                throw new OperationCanceledException();
            }
		}
        public async Task<IList<string>> GetRolesAsync(string id)
		{
			var user = await _userManager.FindByIdAsync(id);
			return await _userManager.GetRolesAsync(user);
		}

		public async Task AddFavouritePharmacy(int pharmacyId, string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {

                throw new Exception("User not found.");
            }

            var pharmacy = _pharmacyService.GetPharmacy(x => x.Id == pharmacyId);

            if (pharmacy == null)
            {
                throw new Exception("Pharmacy not found.");
            }

            if (user.FavPharmacies != null && user.FavPharmacies.Any(p => p.Id == pharmacyId))
            {
                throw new Exception("Product is already in favorites.");
            }

            user.FavPharmacies = user.FavPharmacies?.Append(pharmacy).ToList();

            try
            {
                await _userManager.UpdateAsync(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating user: {ex.Message}");
                throw new Exception("Internal Server Error");
            }
        }

        public async Task AddFavouriteProduct(int productId, string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            var product = _productService.GetProduct(x => x.Id == productId);

            if (product == null)
            {
                throw new Exception("Product not found.");
            }

            if (user.FavProducts != null && user.FavProducts.Any(p => p.Id == productId))
            {
                throw new Exception("Product is already in favorites.");
            }

            user.FavProducts = user.FavProducts?.Append(product).ToList();

            try
            {
                await _userManager.UpdateAsync(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating user: {ex.Message}");
                throw new Exception("Internal Server Error");
            }
        }

        public async Task BanUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            user.LockoutEnd = DateTime.MaxValue;
            await _userManager.UpdateAsync(user);
        }

        public async Task<User> GetUserByName(string name)
        {
            return await _userManager.FindByNameAsync(name);
        }

		public async Task<IEnumerable<User>> GetAllUsers()
		{
            return await Task.Run(() =>
            {
                return _userManager.Users;
            });

		}

		public async Task<User> GetUserById(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task RemoveFavouritePharmacy(int pharmacyId, string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            var product = _pharmacyService.GetPharmacy(x => x.Id == pharmacyId);

            if (product == null)
            {
                throw new Exception("Pharmacy not found.");
            }


            if (user.FavPharmacies != null)
            {
                user.FavPharmacies = user.FavPharmacies.Where(p => p.Id != pharmacyId).ToList();
                await _userManager.UpdateAsync(user);
            }
        }

        public async Task RemoveFavouriteProduct(int productId, string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            var product = _productService.GetProduct(x => x.Id == productId);

            if (product == null)
            {
                throw new Exception("Product not found.");
            }


            if (user.FavProducts != null)
            {
                user.FavProducts = user.FavProducts.Where(p => p.Id != productId).ToList();
                await _userManager.UpdateAsync(user);
            }
        }

        public async Task UnbanUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            user.LockoutEnd = null;
            await _userManager.UpdateAsync(user);
        }

	}
}
