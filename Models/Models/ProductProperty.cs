using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class ProductProperty
	{
		[ForeignKey("ProductId")]
		public Product? Product { get; set; }
		public int ProductId { get; set; }
		[ForeignKey("AttributeId")]
		public ProductAttribute? Attribute { get; set; }
		public int AttributeId { get; set; }
		[Required]
		public string? Value { get; set; }
	}
}
