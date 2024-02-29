using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class HistoryDate:BaseEntity
    {
        [Required]
        public DateTime Date { get; set; }
        public ICollection<ProductPriceHistory>? PriceHistory { get; set; }
    }
}
