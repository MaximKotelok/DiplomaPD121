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
    public class PharmaCompany : BaseEntity
	{
        [Required]
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? UserID { get; set; }
        public string? PathToPhoto { get; set; }

        [ForeignKey(nameof(UserID))]
        [JsonIgnore]
        public User? User { get; set; }
    }
}
