using Domain.Models;
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
        Task SendChangeProductStatus(ProductDto productDto, string email, string name, string description, string newStatus);
		Task SendUserStatusUpdateInfo(string email, string name, string description, string newStatus);
        Task<bool> SendConfirmationMail(string email, string secret);
        Task SendBookingInfoForUser(string email, string status, string total);

    }
}
