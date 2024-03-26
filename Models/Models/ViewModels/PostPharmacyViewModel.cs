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
        public string? WorkingWeekOpenTime { get; set; }
        public string? WorkingWeekCloseTime { get; set; }
        public string? WeekendOpenTime { get; set; }
        public string? WeekendCloseTime { get; set; }
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
        public int PharmaCompanyID { get; set; }
        public int CityID { get; set; }

    }
}
