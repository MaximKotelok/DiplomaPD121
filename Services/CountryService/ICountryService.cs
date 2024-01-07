using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.CountryService
{
	public interface ICountryService
	{
		IEnumerable<Country> GetAllCountries(Expression<Func<Country, bool>>? filter = null, string? includeProperties = null);
		Country? GetCountry(Expression<Func<Country, bool>>? filter = null, string? includeProperties = null);		
		void InsertCountry(Country country);
		void UpdateCountry(Country country);
		void DeleteCountry(int id);
	}
}
