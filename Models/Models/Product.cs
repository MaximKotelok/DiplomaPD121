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
    [Table("Products")]
    public class Product: BaseEntity
    {
        [Required]
        public string? Title { get; set; }
		public string? PathToPhoto { get; set; }
		public string? ShortDescription { get; set; }
		public string? Description { get; set; }
		/*public int? ActiveSubstanceID { get; set; }
		[JsonIgnore]
		[ForeignKey("ActiveSubstanceID")]
		public ActiveSubstance? ActiveSubstance { get; set; }*/
		public int? CategoryID { get; set; }
		[ForeignKey(nameof(CategoryID))]
		public Category? Category { get; set; }
		public int? ManufacturerID { get; set; }
		[ForeignKey(nameof(ManufacturerID))]
		public Manufacturer? Manufacturer { get; set; }        
		public IEnumerable<SimilarProductItem>? SimilarProductItems { get; set; }
		public int? BrandID { get; set; }
		[ForeignKey(nameof(BrandID))]
		public Brand? Brand { get; set; }
		public int? SeriesID { get; set; }
		[ForeignKey(nameof(SeriesID))]
		public Series? Series { get; set; }
        public int? ProductConfirmID { get; set; }
		[ForeignKey(nameof(ProductConfirmID))]
        public ProductConfirm? ProductConfirm { get; set; }
		public int? ProductAttributeGroupID { get; set; }
		[ForeignKey(nameof(ProductAttributeGroupID))]
		public ProductAttributeGroup? ProductAttributeGroup { get; set; }
		public ICollection<ProductProperty>? Properties { get; set; }   
		[JsonIgnore]
		public ICollection<ConcreteProduct>? ConcreteProducts { get; set; }
		[JsonIgnore]
		public ICollection<User>? FavUsers { get; set; }
        [JsonIgnore]
        public ICollection<ProductPriceHistory>? PriceHistory { get; set; }
    }
}
