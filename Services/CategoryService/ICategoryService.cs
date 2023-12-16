using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.CategoryService
{
	public interface ICategoryService
	{
		IEnumerable<Category> GetAllCategories(Expression<Func<Category, bool>>? filter = null, string? includeProperties = null);
		Category? GetCategory(Expression<Func<Category, bool>> filter, string? includeProperties = null);
		IEnumerable<Product>? GetProductsFromCategory(int id);
		IEnumerable<Category>? GetSubCategoryFromCategory(int id);
		void InsertCategory(Category category);
		void UpdateCategory(Category category);
		void DeleteCategory(int id);
		List<Category> GetPathToCategory(int id);
	}
}
