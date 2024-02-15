using Domain.Models;
using Domain.Models.ViewModels;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.ProductConfirmService
{
	public class ProductConfirmService : IProductConfirmService
	{
		private readonly IRepository<ProductConfirm> _repository;

		public ProductConfirmService(IRepository<ProductConfirm> repository)
		{
			_repository = repository;
		}

		public void DeleteProductConfirm(int id)
		{
			ProductConfirm? confirm = _repository.Get(x => x.Id == id);
			_repository.Remove(confirm!);
			_repository.SaveChanges();
		}

		public IEnumerable<ProductConfirm> GetAllProductConfirm(Expression<Func<ProductConfirm, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public ProductConfirm? GetProductConfirm(Expression<Func<ProductConfirm, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}

		public void InsertProductConfirm(ProductConfirm productConfirm)
		{
			_repository.Insert(productConfirm);
		}

		public void UpdateProductConfirm(ProductConfirm productConfirm)
		{
			_repository.Update(productConfirm);
		}
	}
}
