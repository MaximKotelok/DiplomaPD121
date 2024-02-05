using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
	public class PostProductViewModel
	{

		public int? Id { get; set; }
		[Required]
		public int? ManufacturerID { get; set; }
		[Required]
		public int? BrandId { get; set; }
		[Required]
		public string? Title { get; set; }
		[Required]
		public string? Description { get; set; }
		[Required]
		public string? ShortDescription { get; set; }
		[Required]
		public int? CategoryID { get; set; }
		public int? AdultsId { get; set; }
		public int? AllergiesId { get; set; }
		public int? ChildrenId { get; set; }
		public int? DiabeticsId { get; set; }
		public int? DriversId { get; set; }
		public int? NursingMothersId { get; set; }
		public int? PregnantId { get; set; }
		[Required]
		public int? ProductAttributeGroupID { get; set; }
		[Required]
		public string? PathToPhoto { get; set; }		
		public List<PropertyViewModel>? Properties { get; set; }
		

		//Medicine
		public int? ActiveSubstanceID { get; set; }

	}
}
