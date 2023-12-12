using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ConcreteProductService
{
	public interface IConcreteProductService
	{
		IEnumerable<ConcreteProduct> GetAllConcreteProducts();
		ConcreteProduct? GetConcreteProduct(int? id);
		void InsertConcreteProduct(ConcreteProduct concreteProduct);
		void UpdateConcreteProduct(ConcreteProduct concreteProduct);
		void DeleteConcreteProduct(int id);
	}
}
