using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.CalculateActionModels
{
	public class ProductListAdminCalculateModel
	{
		public Product? Product { get; set; }
		public Category? Category { get; set; }
		public bool? IsTmp { get; set; }	
	}
}
