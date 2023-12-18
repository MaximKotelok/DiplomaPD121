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
    public class City : BaseEntity
    {
        [Required]
        public string? NameCity { get; set; }

        [Required]
        public string? Longitude { get; set; }

        [Required]
        public string? Latitude { get; set; }
    }

}
