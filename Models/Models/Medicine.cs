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

        public int? AllergiesID { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(AllergiesID))]
        public PermissionType? Allergies { get; set; }

        public int? DiabeticsID { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(DiabeticsID))]
        public PermissionType? Diabetics { get; set; }

        public int? NursingMothersID { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(NursingMothersID))]
        public PermissionType? NursingMothers { get; set; }

        public int? AdultsID { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(AdultsID))]
        public PermissionType? Adults { get; set; }

        public int? PregnantID { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(PregnantID))]
        public PermissionType? Pregnant { get; set; }

        public int? ChildrenID { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(ChildrenID))]
        public PermissionType? Children { get; set; }

        public int? DriversID { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(DriversID))]
        public PermissionType? Drivers { get; set; }
    }
}
