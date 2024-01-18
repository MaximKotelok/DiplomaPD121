using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
	public class SimilarViewModel
	{
		
		public string? Name { get; set; }
		public string? SimilarBy { get; set; }
		public IEnumerable<SimilarProductViewModel>? Products { get; set; }
		
		
	}
}
