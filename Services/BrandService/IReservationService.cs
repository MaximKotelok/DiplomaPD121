using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.BrandService
{
	public interface IBrandService
	{
		IEnumerable<Brand> GetAllBrands(Expression<Func<Brand, bool>>? filter = null, string? includeProperties = null);
		Brand? GetBrand(Expression<Func<Brand, bool>>? filter = null, string? includeProperties = null);		
		void InsertBrand(Brand brand);
		void UpdateBrand(Brand brand);
		void DeleteBrand(int id);
	}
}
