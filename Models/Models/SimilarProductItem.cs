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
    
    public class SimilarProductItem: BaseEntity
    {
        [Required]
        public string? Title { get; set; }
        [Required]
        public int? ProductID { get; set; }
        [ForeignKey(nameof(ProductID))]
        public Product? Product { get; set; }
        [Required]
		public int? SimilarProductGroupID { get; set; }
        [ForeignKey(nameof(SimilarProductGroupID))]
        public SimilarProductGroup? SimilarProductGroup { get; set; }

	}
}
