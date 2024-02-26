using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
    public class PostPharmaCompanyViewModel
    {
        public int? Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }

        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
