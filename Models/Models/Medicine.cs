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

        public int? AllergiesId { get; set; }
        [JsonIgnore]
        [ForeignKey("AllergiesId")]
        public PermissionType? Allergies { get; set; }

        public int? DiabeticsId { get; set; }
        [JsonIgnore]
        [ForeignKey("DiabeticsId")]
        public PermissionType? Diabetics { get; set; }

        public int? NursingMothersId { get; set; }
        [JsonIgnore]
        [ForeignKey("NursingMothersId")]
        public PermissionType? NursingMothers { get; set; }

        public int? AdultsId { get; set; }
        [JsonIgnore]
        [ForeignKey("AdultsId")]
        public PermissionType? Adults { get; set; }

        public int? PregnantId { get; set; }
        [JsonIgnore]
        [ForeignKey("PregnantId")]
        public PermissionType? Pregnant { get; set; }

        public int? ChildrenId { get; set; }
        [JsonIgnore]
        [ForeignKey("ChildrenId")]
        public PermissionType? Children { get; set; }

        public int? DriversId { get; set; }
        [JsonIgnore]
        [ForeignKey("DriversId")]
        public PermissionType? Drivers { get; set; }
    }
}
