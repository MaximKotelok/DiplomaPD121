using DataAccess.Data;
using Domain.Models;
using Lab.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository.Services
{
    public class PropertyRepository : IPropertyRepository
	{
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<ProductProperty> entities;

        public PropertyRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<ProductProperty>();
        }

        public void Delete(ProductProperty entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Remove(entity);
            _applicationDbContext.SaveChanges();
        }

        public ProductProperty? Get(Expression<Func<ProductProperty, bool>> filter, string? includeProperties = null)
        {
            IQueryable<ProductProperty> query = entities;

            if (!string.IsNullOrEmpty(includeProperties))
            {
                foreach (var inculdeProp in includeProperties
                    .Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(inculdeProp);
                }
            }

            return query.Where(filter).FirstOrDefault();
        }

        public IEnumerable<ProductProperty> GetAll(Expression<Func<ProductProperty, bool>>? filter, string? includeProperties = null)
        {
            IQueryable<ProductProperty> query = entities;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            if (!string.IsNullOrEmpty(includeProperties))
            {
                foreach (var inculdeProp in includeProperties
                    .Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(inculdeProp);
                }
            }

            return query.ToList();
        }

        public void Insert(ProductProperty entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Add(entity);
            _applicationDbContext.SaveChanges();
        }

        public void Remove(ProductProperty entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Remove(entity);
        }

        public void SaveChanges()
        {
            _applicationDbContext.SaveChanges();
        }

        public void Update(ProductProperty entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Update(entity);
            _applicationDbContext.SaveChanges();
        }

    }
}
