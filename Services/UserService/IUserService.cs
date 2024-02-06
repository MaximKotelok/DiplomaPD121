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
        public Task AddFavouriteProduct(int productId, string userName);
        public Task RemoveFavouriteProduct(int productId, string userName);
        public Task AddFavouritePharcmacy(int pharmacyId, string userName);
        public Task RemoveFavouritePharcmacy(int pharmacyId, string userName);
        public Task BanUser(string id);
        public Task UnbanUser(string id);
    }
}
