using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class ProductAttributeGroup:BaseEntity
	{
		public string? Name { get; set; }	
		public IEnumerable<ProductAttribute>? AttributesInGroup { get; set; }
		public IEnumerable<ProductExistAttribute>? ExistAttributes { get; set; }
	}
}
