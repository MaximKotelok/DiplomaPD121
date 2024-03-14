using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lab.Domain.Models;

namespace Domain.Models
{
    [Table("ProductPriceHistory")]
    public class ProductPriceHistory:BaseEntity
    {
        [Required]
        public int ProductId { get; set; }

        [ForeignKey(nameof(ProductId))]
        public Product? Product { get; set; }

        [Required]
        public int HistoryDateId { get; set; }

        [ForeignKey(nameof(HistoryDateId))]
        public HistoryDate? HistoryDate { get; set; }

        [Required]
        public double Price { get; set; }
    }
}
