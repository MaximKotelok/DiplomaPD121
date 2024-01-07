using Services.MailService;
using Services.SMTPService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.Models;

namespace Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IEmailSenderService _sMTPService;
        public EmailService(IEmailSenderService sMTPService)
        {
            _sMTPService = sMTPService;
        }
        public Task SendBookingInfo(string email, ProductDto productDto)
        {
            string currentDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            string message = $@"
        <html>
        <head>
            <title>Підтвердження бронювання</title>
        </head>
        <body>
            <p>Шановний виробнику,</p>
            
            <p>Ваш {productDto.Name} з id {productDto.Id} успішно заброньований. Ми маємо вам повідомити, що замовлення прийнято.</p>
            
            <p>Дата бронювання: <strong>{currentDate}</strong></p>

            <p>Дякуємо, що обрали наші послуги.</p>

            <p>З найкращими побажаннями,<br>Адміністрація</p>
        </body>
        </html>
    ";

            return _sMTPService.SendEmailAsync(email, "Підтвердження бронювання", message);
        }
    }
}
