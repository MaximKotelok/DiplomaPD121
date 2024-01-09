using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
	public class HomeProductViewModel
	{
		public int Id { get; set; }
		public string? Title { get; set; }
		public string? ShortDescription { get; set; }
		public string? Manufacturer { get; set; }
		
	}
}
