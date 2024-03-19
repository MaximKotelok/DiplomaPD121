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
    public enum TypeOfPhoto { 
        ICON, PNG, SQUARE, NONE
    };

    public class Category : BaseEntity
    {
        [Required]
        public string? Title { get; set; }
        public int? ParentCategoryID { get; set; }
        [ForeignKey("ParentCategoryID")]
		[JsonIgnore]
		public Category? ParentCategory { get; set; }
		[JsonIgnore]
		public IEnumerable<Product>? Products { get; set; }
		public IEnumerable<Category>? SubCategories { get; set; }        
        public bool? IsDisplayOnBottom { get; set; }
        public string? PathToPhoto { get;set; }        
        public bool? IsRecomended { get; set; }
        public string? PathToRecomendedPhoto { get;set; }        
        public bool? CanHasProducts { get; set; } = false;
	}
}
