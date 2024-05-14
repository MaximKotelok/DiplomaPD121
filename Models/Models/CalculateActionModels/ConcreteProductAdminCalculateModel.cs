using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.CalculateActionModels
{
	public class ConcreteProductAdminCalculateModel : ProductAdminCalculateModel
	{
		public int Id { get; set; }
		public int Quantity { get; set; }
		public double Price { get; set; }
	}
}
