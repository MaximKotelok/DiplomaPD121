using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.AttributeGroupService
{
	public interface IAttributeGroupService
	{
		IEnumerable<ProductAttributeGroup> GetAllProductAttributeGroups(Expression<Func<ProductAttributeGroup, bool>>? filter = null, string? includeProperties = null);
		ProductAttributeGroup? GetProductAttributeGroup(Expression<Func<ProductAttributeGroup, bool>> filter, string? includeProperties = null);
		void InsertProductAttributeGroup(ProductAttributeGroup attributeGroup);
		void UpdateProductAttributeGroup(ProductAttributeGroup attributeGroup);
		void DeleteProductAttributeGroup(int id);
	}
}
