using DataAccess.Migrations;
using Domain.Models;
using Domain.Models.ViewModels;
using Repository.Repository.Interfaces;
using Repository.Repository.Services;
using Services.SimilarProductGroupService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.SimilarProductGroupService
{
	public class UserService : IUserService
	{
		private readonly UserRepository _repository;
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Pharmacy> _pharmacyRepository;

        public UserService(UserRepository repository)
		{
			_repository = repository;
		}

        public void BanUser(User user)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetAllUsers(Expression<Func<User, bool>>? filter = null, string? includeProperties = null)
        {
            return _repository.GetAll(filter, includeProperties);
        }

        public User? GetUser(Expression<Func<User, bool>> filter, string? includeProperties = null)
        {
            return _repository.Get(filter, includeProperties);
        }

        public void UpdateUser(User user)
        {
            _repository.Update(user);
        }

        public void AddFavouriteFarmacy(User user, int farmacyId)
        {
            var pharmacy = _pharmacyRepository.Get(x => x.Id == farmacyId);
            _repository.AddFavouriteFarmacy(user, pharmacy);
        }

        public void AddFavouriteProduct(User user, int productId)
        {
            var product = _productRepository.Get(x => x.Id == productId);
            _repository.AddFavouriteProduct(user, product);
        }
    }
}
