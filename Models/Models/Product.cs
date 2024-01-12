﻿using Lab.Domain.Models;
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
        public int? CategoryID { get; set; }
		[ForeignKey("CategoryID")]
		public Category? Category { get; set; }
		public int? ManufacturerID { get; set; }
		[ForeignKey("ManufacturerID")]
		public Manufacturer? Manufacturer { get; set; }
        public int? SimilarProductGroupId { get; set; }
		[ForeignKey("SimilarProductGroupId")]
		public SimilarProductGroup? SimilarProductGroup { get; set; }
		public int? BrandId { get; set; }
		[ForeignKey("BrandId")]
		public Brand? Brand { get; set; }
		public int? SeriesId { get; set; }
		[ForeignKey("SeriesId")]
		public Series? Series { get; set; }
		public IEnumerable<ProductProperty>? Properties { get; set; }

        [JsonIgnore]
        public IEnumerable<ConcreteProduct>? ConcreteProducts { get; set; }   
	}
}
