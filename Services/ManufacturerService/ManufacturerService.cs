using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.ManufacturerService
{
	public class ManufacturerService : IManufacturerService
	{
		private readonly IRepository<Manufacturer> _repository;

		public ManufacturerService(IRepository<Manufacturer> repository)
		{
			_repository = repository;
		}		

		public void DeleteManufacturer(int id)
		{
			Manufacturer manufacturer = _repository.Get(a => a.Id == id);
			_repository.Remove(manufacturer);
			_repository.SaveChanges();

		}

		public IEnumerable<Manufacturer> GetAllManufacturers(Expression<Func<Manufacturer, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public Manufacturer? GetManufacturer(Expression<Func<Manufacturer, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}


		public void InsertManufacturer(Manufacturer manufacturer)
		{
			_repository.Insert(manufacturer);
		}


		public void UpdateManufacturer(Manufacturer manufacturer)
		{
			_repository.Update(manufacturer);
		}
	}
}
