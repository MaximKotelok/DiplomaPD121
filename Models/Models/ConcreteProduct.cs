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
    public class ConcreteProduct : BaseEntity
	{
        [Required]
        public double Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public int ProductID { get; set; }
        [ForeignKey("ProductID")]
		public Product? Product { get; set; }
		public int? PharmacyID { get; set; }
		[ForeignKey("PharmacyID")]        
		public Pharmacy? Pharmacy { get; set; }
        [JsonIgnore]
		public IEnumerable<ReservationItem>? ReservationItems { get; set; }		
	}
}
