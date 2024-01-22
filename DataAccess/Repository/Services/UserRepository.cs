using DataAccess.Data;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository.Services
{
    public class UserRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<User> entities;

        public UserRepository (ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<User>();
        }

        public void Delete(User entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Remove(entity);
            _applicationDbContext.SaveChanges();
        }

        public User? Get(Expression<Func<User, bool>> filter, string? includeProperties = null)
        {
            IQueryable<User> query = entities;

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

        public IEnumerable<User> GetAll(Expression<Func<User, bool>>? filter, string? includeProperties = null)
        {
            IQueryable<User> query = entities;
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

        public void Insert(User entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Add(entity);
            _applicationDbContext.SaveChanges();
        }

        public void AddFavouriteProduct(User entity, Product product)
        {
            if (entity == null || product == null)
            {
                throw new ArgumentNullException("entity");
            }

            var user = entities.Find(entity.Id);
            user?.FavProducts?.Append(product);
            _applicationDbContext.SaveChanges();
        }
        public void AddFavouriteFarmacy(User entity, Pharmacy pharmacy)
        {
            if (entity == null || pharmacy == null)
            {
                throw new ArgumentNullException("entity");
            }

            var user = entities.Find(entity.Id);
            user?.FavPharmacies?.Append(pharmacy);
            _applicationDbContext.SaveChanges();
        }
        public void Ban(User entity)
        {

        }

        public void Remove(User entity)
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

        public void Update(User entity)
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
