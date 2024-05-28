using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
	public class PropertyViewModel
	{

		public int? Id { get; set; }
		public string? Name { get; set; }
		public string? Value { get; set; }
		public string? PathToPhoto { get; set; }
	}
}
