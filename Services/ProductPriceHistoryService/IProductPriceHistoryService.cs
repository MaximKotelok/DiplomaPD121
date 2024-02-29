using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductPriceHistoryService
{
    public interface IProductPriceHistoryService
    {
        IEnumerable<ProductPriceHistory> GetAllProductPriceHistory(Expression<Func<ProductPriceHistory, bool>>? filter = null, string? includeProperties = null);
        ProductPriceHistory? GetProductPriceHistory(Expression<Func<ProductPriceHistory, bool>>? filter = null, string? includeProperties = null);
        void InsertProductPriceHistory(ProductPriceHistory productPriceHistory);
        void UpdateProductPriceHistory(ProductPriceHistory productPriceHistory);
        void DeleteProductPriceHistory(int id);
    }
}
