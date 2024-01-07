using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.ManufacturerService
{
	public interface IManufacturerService
	{
		IEnumerable<Manufacturer> GetAllManufacturers(Expression<Func<Manufacturer, bool>>? filter = null, string? includeProperties = null);
		Manufacturer? GetManufacturer(Expression<Func<Manufacturer, bool>>? filter = null, string? includeProperties = null);		
		void InsertManufacturer(Manufacturer manufacturer);
		void UpdateManufacturer(Manufacturer manufacturer);
		void DeleteManufacturer(int id);
	}
}
