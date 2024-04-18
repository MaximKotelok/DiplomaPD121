using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class Brand:BaseEntity
	{
		[Required]
		public string? Name { get; set; }
		public string? Description { get; set; }
		public string? PathToPhoto { get; set; }
		public int? CountryBrandID { get; set; }
		[ForeignKey("CountryBrandID")]
		public Country? CountryBrand { get; set; }

        [JsonIgnore]
        public IEnumerable<Product>? Products { get; set; }
    }
}
