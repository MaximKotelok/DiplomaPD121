using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.Models;

namespace Services.EmailService
{
    public interface IEmailService
    {
        Task SendBookingInfo(string email, ProductDto productDto);
        Task SendChangeProductStatus(string email, ProductDto productDto, string newStatus);
        Task SendConfirmationMail(string email);
    }
}
