using Domain.Models;
using Microsoft.EntityFrameworkCore.Query;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.CategoryService
{
    public class CategoryService : ICategoryService
	{
		private readonly IRepository<Category> _repository;

		public CategoryService(IRepository<Category> repository)
		{
			_repository = repository;
		}

		public void DeleteCategory(int id)
		{
			Category? category = _repository.Get(x => x.Id == id);
			_repository.Remove(category);
			_repository.SaveChanges();
		}
		public IEnumerable<Category> GetAllCategories(Expression<Func<Category, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public Category? GetCategory(Expression<Func<Category, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}

		
	
		public void InsertCategory(Category category)
		{
			_repository.Insert(category);
		}

		public void UpdateCategory(Category category)
		{
			_repository.Update(category);
		}

	}
}
