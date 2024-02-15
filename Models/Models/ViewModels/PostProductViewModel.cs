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
		public int? PharmaCompanyID { get; set; }
		[Required]
		public int? ManufacturerID { get; set; }
		[Required]
		public int? BrandID { get; set; }
		[Required]
		public string? Title { get; set; }
		[Required]
		public string? Description { get; set; }
		[Required]
		public string? ShortDescription { get; set; }
		[Required]
		public int? CategoryID { get; set; }
		public int? AdultsID { get; set; }
		public int? AllergiesID { get; set; }
		public int? ChildrenID { get; set; }
		public int? DiabeticsID { get; set; }
		public int? DriversID { get; set; }
		public int? NursingMothersID { get; set; }
		public int? PregnantID { get; set; }
		public int? ProductAttributeGroupID { get; set; }
		public string? PathToPhoto { get; set; }		
		public List<PropertyViewModel>? Properties { get; set; }
		

		//Medicine
		public int? ActiveSubstanceID { get; set; }

	}
}
