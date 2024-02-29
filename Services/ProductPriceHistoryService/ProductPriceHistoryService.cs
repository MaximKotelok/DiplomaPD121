using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductPriceHistoryService
{
    public class ProductPriceHistoryService : IProductPriceHistoryService
    {
        private readonly IRepository<ProductPriceHistory> _repository;

        public ProductPriceHistoryService(IRepository<ProductPriceHistory> repository)
        {
            _repository = repository;
        }

        public void DeleteProductPriceHistory(int id)
        {
            ProductPriceHistory productPriceHistory = _repository.Get(a => a.Id == id)!;
            _repository.Remove(productPriceHistory);
            _repository.SaveChanges();
        }

        public IEnumerable<ProductPriceHistory> GetAllProductPriceHistory(Expression<Func<ProductPriceHistory, bool>>? filter = null, string? includeProperties = null)
        {
            return _repository.GetAll(filter, includeProperties);
        }

        public ProductPriceHistory? GetProductPriceHistory(Expression<Func<ProductPriceHistory, bool>>? filter = null, string? includeProperties = null)
        {
            return _repository.Get(filter, includeProperties);
        }

        public void InsertProductPriceHistory(ProductPriceHistory productPriceHistory)
        {
            _repository.Insert(productPriceHistory);
            _repository.SaveChanges();
        }

        public void UpdateProductPriceHistory(ProductPriceHistory productPriceHistory)
        {
            _repository.Update(productPriceHistory);
            _repository.SaveChanges();
        }
    }
}
