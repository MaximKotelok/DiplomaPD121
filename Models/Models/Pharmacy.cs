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
    public class Pharmacy: BaseEntity
	{
		[Required]
        public string? Address { get; set; }

		[Required]
		public string? OpenTime { get; set; }

		[Required]
		public string? CloseTime { get; set; }

		[Required]
		public string? Longitude { get; set; }

		[Required]
		public string? Latitude { get; set; }

		[Required]
        public int PharmaCompanyID { get; set; }
        [ForeignKey(nameof(PharmaCompanyID))]
        public PharmaCompany? PharmaCompany { get; set; }
		[JsonIgnore]
		public IEnumerable<ConcreteProduct>? ConcreteProducts { get; set; }

        [Required]
        public int CityID { get; set; }
        [ForeignKey(nameof(CityID))]
        public City? City { get; set; }
        public string? UserID { get; set; }
        [ForeignKey(nameof(UserID))]
        public User? User { get; set; }

        [JsonIgnore]
        public IEnumerable<User>? FavUsers { get; set; }
    }
}
