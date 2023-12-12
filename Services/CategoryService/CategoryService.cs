using DataAccess.Repository.IRepository;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
			Category? category = _repository.Get(id);
			_repository.Remove(category);
			_repository.SaveChanges();
		}
		public IEnumerable<Category> GetAllCategories()
		{
			return _repository.GetAll();
		}

		public Category? GetCategory(int? id)
		{
			return _repository.Get(id);
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
