using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
    public class PostPharmacyViewModel
    {
        public int? Id { get; set; }
        public string? Address { get; set; }
        public string? OpenTime { get; set; }
        public string? CloseTime { get; set; }
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
        public int PharmaCompanyID { get; set; }
        public int CityID { get; set; }


        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
