using Domain.Models;
using Microsoft.EntityFrameworkCore.Query;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.AttributeGroupService
{
    public class AttributeGroupService : IAttributeGroupService
	{
		private readonly IRepository<ProductAttributeGroup> _repository;

		public AttributeGroupService(IRepository<ProductAttributeGroup> repository)
		{
			_repository = repository;
		}

		public void DeleteProductAttributeGroup(int id)
		{
			ProductAttributeGroup? group = _repository.Get(x => x.Id == id);
			_repository.Remove(group);
			_repository.SaveChanges();
		}
		public IEnumerable<ProductAttributeGroup> GetAllProductAttributeGroups(Expression<Func<ProductAttributeGroup, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public ProductAttributeGroup? GetProductAttributeGroup(Expression<Func<ProductAttributeGroup, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}

		
	
		public void InsertProductAttributeGroup(ProductAttributeGroup group)
		{
			_repository.Insert(group);
		}

		public void UpdateProductAttributeGroup(ProductAttributeGroup group)
		{
			_repository.Update(group);
		}

	}
}
