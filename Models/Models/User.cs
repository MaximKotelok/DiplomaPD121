using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class User: IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public Pharmacy? Pharmacy { get; set; }
        [JsonIgnore]
        public IEnumerable<Product>? FavProducts { get; set; }
        
        [JsonIgnore]
        public IEnumerable<Pharmacy>? FavPharmacies { get; set; }
    }
}
