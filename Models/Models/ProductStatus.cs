using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class ProductStatus:BaseEntity
    {
        public string? Status { get; set; }
        public string? Color { get; set; }
    }
}
