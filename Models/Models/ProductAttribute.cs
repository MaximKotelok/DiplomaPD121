using Lab.Domain.Models;
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
	public class ProductAttribute:BaseEntity
	{
		[Required]
		public string? Name { get; set; }
		[Required]
		public int Index { get; set; }
		public int ProductAttributeGroupID { get; set; }
		[ForeignKey("ProductAttributeGroupID")]
		[JsonIgnore]
		public ProductAttributeGroup? ProductAttributeGroup { get; set; }
	}
}
