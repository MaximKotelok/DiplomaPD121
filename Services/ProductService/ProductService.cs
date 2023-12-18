using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.ConcreteProductService
{
	public class ProductService : IProductService
	{
		private readonly IRepository<Product> _repository;

		public ProductService(IRepository<Product> repository)
		{
			_repository = repository;
		}

		public void DeleteProduct(int id)
		{
			Product? product = _repository.Get(x => x.Id == id);
			_repository.Remove(product);
			_repository.SaveChanges();
		}
		public IEnumerable<Product> GetAllProducts(Expression<Func<Product, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public Product? GeteProduct(Expression<Func<Product, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}
		public void InsertProduct(Product product)
		{
			_repository.Insert(product);
		}

		public void UpdateProduct(Product product)
		{
			_repository.Update(product);
		}
	}
}
