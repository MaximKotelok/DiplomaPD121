using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utility.Models
{
    public class SendGridSettings
    {
        public string? FromEmail { get; set; }
        public string? EmailName { get; set; }
        public string? EmailPassword { get; set; }
    }
}
