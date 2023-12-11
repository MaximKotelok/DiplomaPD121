using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    [Table("Medicine")]
    public class Medicine : Product
    {
        public string? SpecialRow { get; set; }
    }
}
