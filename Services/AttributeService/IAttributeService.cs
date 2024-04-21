using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.AttributeService
{
	public interface IAttributeService
	{
		IEnumerable<ProductAttribute> GetAllAttributes(Expression<Func<ProductAttribute, bool>>? filter = null, string? includeProperties = null);
		ProductAttribute? GetAttribute(Expression<Func<ProductAttribute, bool>> filter, string? includeProperties = null);
		void InsertAttribute(ProductAttribute attribute);
		void UpdateAttribute(ProductAttribute attribute);
		void DeleteAttribute(int id);
	}
}
