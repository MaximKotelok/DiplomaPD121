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
        ICON, SQUARE, PNG, LARGE
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
        [JsonIgnore]
		public IEnumerable<Category>? SubCategories { get; set; }        
        public bool? IsActual { get; set; }        
        public string? PathToPhoto { get;set; }        
        public TypeOfPhoto? SubCategoriesTypeOfPhoto { get; set; }
	}
}
