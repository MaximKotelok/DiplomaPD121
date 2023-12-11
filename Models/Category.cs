using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
	public class Category
	{
		[Key]
		public int CategoryID { get; set; }
		[Required]
		public string? Title { get; set; }
		public int? ParentCategoryID { get; set; }
		[ForeignKey("ParentCategoryID")]
		public Category? ParentCategory { get; set; }
		public IEnumerable<Product>? Products { get; set; }

	}
}
