using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
	public class PostProductViewModel
	{

		public int? Id { get; set; }
		public string? Title { get; set; }
		public string? Description { get; set; }
		public string? ShortDescription { get; set; }
		public int? CategoryID { get; set; }
		public string? PathToPhoto { get; set; }		
		public List<PropertyViewModel>? Properties { get; set; }
		

		//Medicine
		public int? ActiveSubstanceID { get; set; }

	}
}
