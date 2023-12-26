using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.ConcreteProductService
{
	public interface IProductService
	{
		IEnumerable<Product> GetAllProducts(Expression<Func<Product, bool>>? filter = null, string? includeProperties = null);
		Product? GetProduct(Expression<Func<Product, bool>> filter, string? includeProperties = null);
		void InsertProduct(Product product);
		void UpdateProduct(Product product);
		void DeleteProduct(int id);
	}
}
