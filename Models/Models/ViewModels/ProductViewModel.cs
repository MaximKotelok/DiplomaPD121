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
		public string? ShortDescription { get; set; }
		public int? ProductAttributeGroupID { get; set; }
		public string? Description { get; set; }
		public int? ManufacturerID { get; set; }
		public int? BrandID { get; set; }
		public int? CategoryID { get; set; }
		public string? PathToPhoto { get; set; }
		public int? SimilarGroupID { get; set; }
		public List<PropertyViewModel>? Properties { get; set; }
		public List<ProductViewModel>? SimilarProductsGroup { get; set; }


		
	}
}
