using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
    public class PostProductToPharmacyViewModel
    {
        public int? ProductId { get; set; }
        public int? Price { get; set; }
        public int? Quantity { get; set; }

    }
}
