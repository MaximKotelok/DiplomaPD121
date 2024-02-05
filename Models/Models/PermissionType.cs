using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class PermissionType : BaseEntity
    {
        [Required]
        public string? Title { get; set; }
	}
}
