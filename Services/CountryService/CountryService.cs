using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.CountryService
{
	public class CountryService : ICountryService
	{
		private readonly IRepository<Country> _repository;

		public CountryService(IRepository<Country> repository)
		{
			_repository = repository;
		}


		public void DeleteCountry(int id)
		{
			Country country = _repository.Get(a => a.Id == id)!;
			_repository.Remove(country);
			_repository.SaveChanges();
		}

		
		public IEnumerable<Country> GetAllCountries(Expression<Func<Country, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public Country? GetCountry(Expression<Func<Country, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}

		public void InsertCountry(Country country)
		{
			_repository.Insert(country);
		}


		public void UpdateCountry(Country country)
		{
			_repository.Update(country);
		}
	}
}
