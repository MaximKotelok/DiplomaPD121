using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
	public class ConcreteProduct
	{
		[Key]
		public int ConcreteProductID { get; set; }
		[Required]
		public double Price { get; set; }
		[Required]
		public int Quantity { get; set; }
		[Required]
		public int ProductID { get; set; }
		[ForeignKey("ProductID")]
		public Product? Product { get; set; }
	}
}
