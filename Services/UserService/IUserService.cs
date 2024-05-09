using DataAccess.Migrations;
using Domain.Models;
using Domain.Models.ViewModels;
using Repository.Repository.Interfaces;
using Services.SimilarProductGroupService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.UserService
{
    public interface IUserService
    {
        public Task<IList<string>> GetRolesAsync(string id);

		public Task<User> GetUserByName(string name);
        public Task<IEnumerable<User>> GetAllUsers();
		public Task<User> GetUserById(string id);
        public Task ChangePassword(string id, string currentPassword, string newPassword);
        public Task<bool> ChangePasswordWithoutConfirmAsync(string id, string newPassword);
		public Task AddFavouriteProduct(int productId, string userName);
        public Task UpdateUser(string id, string? firstName = "", string? lastName = "", string? phoneNumber = "", string email = "", string userName = "");
        public Task UpdatePhoto(string id, string newPath);
        public Task RemoveFavouriteProduct(int productId, string userName);
        public Task AddFavouritePharmacy(int pharmacyId, string userName);
        public Task RemoveFavouritePharmacy(int pharmacyId, string userName);
        public Task BanUser(string id);
        public Task UnbanUser(string id);
    }
}
