using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
	public class ProductViewModel
	{
		public int? Id { get; set; }	
		public string? Title { get; set; }
		public string? Description { get; set; }
		public int? CategoryID { get; set; }
		public string? PathToPhoto { get; set; }
		public List<PropertyViewModel>? Properties { get; set; }
		public int? SimilarGroupId { get; set; }
		public List<ProductViewModel>? SimilarProductsGroup { get; set; }
	}
}
