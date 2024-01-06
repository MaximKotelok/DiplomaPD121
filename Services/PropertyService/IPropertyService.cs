using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.PropertyService
{
	public interface IPropertyService
	{
		IEnumerable<ProductProperty> GetAllProperties(Expression<Func<ProductProperty, bool>>? filter = null, string? includeProperties = null);
		ProductProperty? GetProperty(Expression<Func<ProductProperty, bool>> filter, string? includeProperties = null);
		void InsertProperty(ProductProperty property);
		void UpdateProperty(ProductProperty property);
		void DeleteProperty(int attributeId, int productId);
		void DeleteProperty(int productId);
	}
}
