using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
    public class PharmaCompanyAdminViewModel
    {
        public int? PharmaCompanyId { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
