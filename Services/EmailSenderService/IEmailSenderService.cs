using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.SMTPService
{
    public interface IEmailSenderService
    {
        Task<bool> SendEmailAsync(string email, string subject, string message);
    }
}
