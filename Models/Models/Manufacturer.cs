using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class Manufacturer:BaseEntity
	{
		[Required]
		public string? Name { get; set; }	
		[Required]
		public string? Address { get; set; }	
		public string? URLSite { get; set; }
		public int? CountryManufactureID { get; set; }
		[ForeignKey("CountryManufactureID")]
		public Country? CountryManufacture { get; set; }
	}
}
