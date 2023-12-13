using DataAccess.Repository.IRepository;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.ConcreteProductService
{
	public class ConcreteProductService : IConcreteProductService
	{
		private readonly IRepository<ConcreteProduct> _repository;

		public ConcreteProductService(IRepository<ConcreteProduct> repository)
		{
			_repository = repository;
		}

		public void DeleteConcreteProduct(int id)
		{
			ConcreteProduct? concreteProduct = _repository.Get(x => x.Id == id);
			_repository.Remove(concreteProduct);
			_repository.SaveChanges();
		}
		public IEnumerable<ConcreteProduct> GetAllConcreteProducts(Expression<Func<ConcreteProduct, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public ConcreteProduct? GetConcreteProduct(Expression<Func<ConcreteProduct, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}
		public void InsertConcreteProduct(ConcreteProduct concreteProduct)
		{
			_repository.Insert(concreteProduct);
		}

		public void UpdateConcreteProduct(ConcreteProduct concreteProduct)
		{
			_repository.Update(concreteProduct);
		}
	}
}
