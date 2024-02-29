using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
	public class FiltersViewModel
	{
		public IEnumerable<int>? CountryIds { get; set; }	
		public IEnumerable<int>? ManufacturerIds { get; set; }	
		public IEnumerable<int>? CategoryIds { get; set; }	
		public IEnumerable<int>? PropertyIds { get; set; }	
	}
}
