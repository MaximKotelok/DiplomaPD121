﻿using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    [Table("Products")]
    public class Product: BaseEntity
    {
        [Required]
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? CategoryID { get; set; }
        public string? PathToPhoto { get; set; }

        [ForeignKey("CategoryID")]
        public Category? Category { get; set; }		

        public IEnumerable<ProductProperty>? Properties { get; set; }   
	}
}
