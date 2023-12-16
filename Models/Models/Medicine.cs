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
    [Table("Medicines")]
    public class Medicine : Product
    {
		[Required]
		public int ActiveSubstanceID { get; set; }
        [JsonIgnore]
		[ForeignKey("ActiveSubstanceID")]
		public ActiveSubstance? ActiveSubstance { get; set; }
        public string? SpecialRow { get; set; }
    }
}
