using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.SimilarProductGroupService
{
	public interface IUserService
	{
		IEnumerable<User> GetAllUsers(Expression<Func<User, bool>>? filter = null, string? includeProperties = null);
        User? GetUser(Expression<Func<User, bool>> filter, string? includeProperties = null);
		void UpdateUser(User user);
		void BanUser(User user);
		void AddFavouriteProduct(User user, int productId);
		void AddFavouriteFarmacy(User user, int farmacyId);
    }
}
