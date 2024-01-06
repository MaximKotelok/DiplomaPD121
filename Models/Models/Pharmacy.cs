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
    public class Pharmacy: BaseEntity
	{
        [Required]
		[EmailAddress]
		public string? Email { get; set; }
		[Required]
        public string? Address { get; set; }
        [Required]
        public string? Coord { get; set; }
        
        [Required]
        public int PharmaCompanyID { get; set; }
        [ForeignKey("PharmaCompanyID")]
        public PharmaCompany? PharmaCompany { get; set; }
		[JsonIgnore]
		public IEnumerable<ConcreteProduct>? ConcreteProducts { get; set; }

        [Required]
        public int CityID { get; set; }
        [ForeignKey("CityID")]
        public City? City { get; set; }


    }
}
