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

namespace Services.AttributeService
{
    public class AttributeService : IAttributeService
	{
		private readonly IRepository<ProductAttribute> _repository;

		public AttributeService(IRepository<ProductAttribute> repository)
		{
			_repository = repository;
		}

		
		public IEnumerable<ProductAttribute> GetAllAttributes(Expression<Func<ProductAttribute, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public ProductAttribute? GetAttribute(Expression<Func<ProductAttribute, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}

        public void DeleteAttribute(int id)
        {
            ProductAttribute? attribute = _repository.Get(x => x.Id == id);
            _repository.Remove(attribute);
            _repository.SaveChanges();
        }

        public void InsertAttribute(ProductAttribute attribute)
		{
			_repository.Insert(attribute);
		}

		public void UpdateAttribute(ProductAttribute attribute)
		{
			_repository.Update(attribute);
		}

	}
}
