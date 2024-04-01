using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
	public class SearchViewModel
	{
		public string? Title { get; set; } = null;
		public int[]? Categories { get; set; } = null;
		public int[]? Brands { get; set; } = null;
		public int? ActiveSubstanceId { get; set; } = null;
		public PropertySearchViewModel[]? Properties { get; set; } = null;
	}

	public class PropertySearchViewModel
	{
		public string? Name { get; set; }
		public string? Value { get; set; }
	}

}
