using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.CalculateActionModels
{
	public class ProductAdminCalculateModel
	{
		public int? CategoryId { get; set; }
		public string? CategoryPathToPhoto { get; set; }
		public string? CategoryTitle { get; set; }
		public string? Title { get; set; }
		public string? Brand { get; set; }
		public string? Manufacturer { get; set; }
		public string? ShortDescription { get; set; }
		public string? PathToPhoto { get; set; }
		public bool? IsTmp { get; set; }	
	}
}
