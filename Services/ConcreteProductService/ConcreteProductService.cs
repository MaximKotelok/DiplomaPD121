using DataAccess.Repository.IRepository;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
			ConcreteProduct? concreteProduct = _repository.Get(id);
			_repository.Remove(concreteProduct);
			_repository.SaveChanges();
		}
		public IEnumerable<ConcreteProduct> GetAllConcreteProducts()
		{
			return _repository.GetAll();
		}

		public ConcreteProduct? GetConcreteProduct(int? id)
		{
			return _repository.Get(id);
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
