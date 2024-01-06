using Domain.Models;
using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository.Interfaces
{
    public interface IPropertyRepository
    {
        IEnumerable<ProductProperty> GetAll(Expression<Func<ProductProperty, bool>>? filter = null, string? includeProperties = null);
		ProductProperty? Get(Expression<Func<ProductProperty, bool>> filter, string? includeProperties = null);
        void Insert(ProductProperty entity);
        void Update(ProductProperty entity);
        void Delete(ProductProperty entity);
        void Remove(ProductProperty entity);
        void SaveChanges();
    }
}
