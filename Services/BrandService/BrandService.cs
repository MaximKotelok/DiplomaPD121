using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.BrandService
{
	public class BrandService : IBrandService
	{
		private readonly IRepository<Brand> _repository;

		public BrandService(IRepository<Brand> repository)
		{
			_repository = repository;
		}

		public void DeleteBrand(int id)
		{
			Brand brand = _repository.Get(a => a.Id == id)!;
			_repository.Remove(brand);
			_repository.SaveChanges();
		}

		public IEnumerable<Brand> GetAllBrands(Expression<Func<Brand, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}
		
		public Brand? GetBrand(Expression<Func<Brand, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}

		public void InsertBrand(Brand brand)
		{
			_repository.Insert(brand);
		}

		public void UpdateBrand(Brand brand)
		{
			_repository.Update(brand);
		}
		
	}
}
