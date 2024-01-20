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
        public Task SendChangeProductStatus(string email, ProductDto productDto, string newStatus)
        {
            string currentDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            string message = $@"
    <html>
    <head>
        <title>Зміна статусу продукту</title>
    </head>
    <body>
        <p>Шановний виробнику,</p>
        
        <p>Статус вашого продукту {productDto.Name} з id {productDto.Id} був змінений. Новий статус: <strong>{newStatus}</strong>.</p>
        
        <p>Дата зміни статусу: <strong>{currentDate}</strong></p>

        <p>Дякуємо, що обрали наші послуги.</p>

        <p>З найкращими побажаннями,<br>Адміністрація</p>
    </body>
    </html>
";

            return _sMTPService.SendEmailAsync(email, "Зміна статусу продукту", message);
        }
        public Task SendConfirmationMail(string email, string userID)
        {
            string currentDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            string message = $@"
    <html>
    <head>
        <title>Підтвердження реєстрації</title>
    </head>
    <body>       
        <p>Дякуємо за реєстрацію в нашому сервісі. Для підтвердження реєстрації, будь ласка, перейдіть за посиланням нижче:</p>
        
        <p><a href=""{GetConfirmationLink(email)}"">Підтвердити реєстрацію</a></p>
        
        <p>Дата реєстрації: <strong>{currentDate}</strong></p>

        <p>Дякуємо, що обрали наші послуги.</p>

        <p>З найкращими побажаннями,<br>Адміністрація</p>
    </body>
    </html>
";

            return _sMTPService.SendEmailAsync(email, "Підтвердження реєстрації", message);
        }

        private string GetConfirmationLink(string userID)
        {
            return $"https://localhost:7133/api/userauthentication/confirm?token={Uri.EscapeDataString(userID)}";
        }
    }
}
