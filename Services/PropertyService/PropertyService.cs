using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.PropertyService
{
	public class PropertyService : IPropertyService
	{
		private readonly IPropertyRepository _repository;

		public PropertyService(IPropertyRepository repository)
		{
			_repository = repository;
		}

		public void DeleteProperty(int attributeId, int productId)
		{
			ProductProperty? property = _repository.Get(x => x.AttributeId == attributeId && x.ProductId == productId);
			_repository.Remove(property);
			_repository.SaveChanges();
		}
		public void DeleteProperty(int productId)
		{
			var properties = _repository.GetAll(x => x.ProductId == productId);
			foreach (var property in properties)
			{

				_repository.Remove(property);
			}
			_repository.SaveChanges();
		}
		public IEnumerable<ProductProperty> GetAllProperties(Expression<Func<ProductProperty, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public ProductProperty? GetProperty(Expression<Func<ProductProperty, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}
		public void InsertProperty(ProductProperty property)
		{
			_repository.Insert(property);
		}

		public void UpdateProperty(ProductProperty property)
		{
			_repository.Update(property);
		}
	}
}
