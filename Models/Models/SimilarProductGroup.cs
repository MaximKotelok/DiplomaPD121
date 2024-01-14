using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class SimilarProductGroup:BaseEntity
	{
		[Required]
		public string? Name { get; set; }
		[Required]
		public string? SimilarBy { get; set; }
		public IEnumerable<SimilarProductItem>? Similar { get; set;}
	}
}
