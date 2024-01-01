using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.ZooproductService
{
    public class ZooproductService : IZooproductService
	{
		private IRepository<Zooproduct> _repository;

		public ZooproductService(IRepository<Zooproduct> repository)
		{
			_repository = repository;
		}

		public void DeleteZooproduct(int id)
		{
			Zooproduct? zooproduct = _repository.Get(x => x.Id == id);
			_repository.Remove(zooproduct);
			_repository.SaveChanges();
		}

		public IEnumerable<Zooproduct> GetAllZooproducts(Expression<Func<Zooproduct, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public Zooproduct? GetZooproduct(Expression<Func<Zooproduct, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}

		public void InsertZooproduct(Zooproduct zooproduct)
		{
			_repository.Insert(zooproduct);
		}

		public void UpdateZooproduct(Zooproduct zooproduct)
		{
			_repository.Update(zooproduct);
		}

	}
}
