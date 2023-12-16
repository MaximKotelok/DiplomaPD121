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
    public class Pharmacy: BaseEntity
	{
        [Required]
        public string? Address { get; set; }
        [Required]
        public string? Coord { get; set; }
        [Required]
        public int PharmaCompanyID { get; set; }
        [ForeignKey("PharmaCompanyID")]
        public PharmaCompany? PharmaCompany { get; set; }
        public IEnumerable<Product>? Products { get; set; }
    }
}
