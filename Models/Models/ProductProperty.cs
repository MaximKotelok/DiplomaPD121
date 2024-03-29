using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class ProductProperty
	{
		[JsonIgnore]
		[ForeignKey(nameof(ProductID))]
		public Product? Product { get; set; }
		public int ProductID { get; set; }
		[ForeignKey(nameof(AttributeID))]
		public ProductAttribute? Attribute { get; set; }
		public int AttributeID { get; set; }
		[Required]
		public string? Value { get; set; }
	}
}
