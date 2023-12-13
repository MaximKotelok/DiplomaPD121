using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.ConcreteProductService
{
	public interface IConcreteProductService
	{
		IEnumerable<ConcreteProduct> GetAllConcreteProducts(Expression<Func<ConcreteProduct, bool>>? filter = null, string? includeProperties = null);
		ConcreteProduct? GetConcreteProduct(Expression<Func<ConcreteProduct, bool>> filter, string? includeProperties = null);
		void InsertConcreteProduct(ConcreteProduct concreteProduct);
		void UpdateConcreteProduct(ConcreteProduct concreteProduct);
		void DeleteConcreteProduct(int id);
	}
}
