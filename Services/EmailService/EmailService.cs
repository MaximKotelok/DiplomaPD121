using Domain.Models;
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
        private readonly IEmailSenderService _emailSenderService;
        public EmailService(IEmailSenderService emailSenderService)
        {
            _emailSenderService = emailSenderService;
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

            return _emailSenderService.SendEmailAsync(email, "Підтвердження бронювання", message);
        }
        public Task SendChangeProductStatus(ProductDto productDto, string email, string name, string description, string newStatus)
        {
            string currentDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            string message = $@"
    <html>
    <head>
        <title>Зміна статусу продукту</title>
    </head>
    <body>
        <p>Шановний {name},</p>
        
        <p>Статус вашого продукту {productDto.Name} з id {productDto.Id} був змінений. Новий статус: <strong>{newStatus}</strong>.</p>
        
        <p>Дата зміни статусу: <strong>{currentDate}</strong></p>
        
        <b>Додаткова інформація від Адміністратора: </b>
        <p>{description}</p>

        <p>Дякуємо, що обрали наші послуги.</p>

        <p>З найкращими побажаннями,<br>Адміністрація</p>
    </body>
    </html>
";

            return _emailSenderService.SendEmailAsync(email, "Зміна статусу продукту", message);
        }
        public Task<bool> SendConfirmationMail(string email, string secret)
        {
            string currentDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            string message = $@"
    <html>
    <head>
        <title>Підтвердження реєстрації</title>
    </head>
    <body>       
        <p>Дякуємо за реєстрацію в нашому сервісі. Для підтвердження реєстрації, будь ласка, перейдіть за посиланням нижче:</p>
        
        <p><a href=""{GetConfirmationLink(email, secret)}"">Підтвердити реєстрацію</a></p>
        
        <p>Дата реєстрації: <strong>{currentDate}</strong></p>

        <p>Дякуємо, що обрали наші послуги.</p>

        <p>З найкращими побажаннями,<br>Адміністрація</p>
    </body>
    </html>
";

            return _emailSenderService.SendEmailAsync(email, "Підтвердження реєстрації", message);
        }
        public Task SendBookingInfoForUser(string email, string status, string total)
        {
            string currentDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            string message = $@"
<html>
<head>
    <title>Підтвердження бронювання</title>
</head>
<body>
    <p>Шановний користувачу,</p>
    
    <p>Статус вашего замовлення змінився на {status}.</p>
    <p>Загальна ціна продуктів {total}.</p>
    
    <p>Дата зміни: <strong>{currentDate}</strong></p>
    
    <p>Дякуємо, що обрали наші послуги.</p>

    <p>З найкращими побажаннями,<br>Адміністрація</p>
</body>
</html>
";

            return _emailSenderService.SendEmailAsync(email, "Підтвердження бронювання", message);
        }

        private string GetConfirmationLink(string email, string secret)
        {
            return $"https://localhost:44411/auth/login?email={Uri.EscapeDataString(email)}&secret={Uri.EscapeDataString(secret)}";
        }

		public Task SendUserStatusUpdateInfo(string email, string name, string description, string newStatus)
		{

			
			string message = $@"
    <html>
    <head>
        <title>Сповіщення про зміну статусу вашого облікового запису</title>
    </head>
    <body>
        <p>Шановний/Шановна {name}</p>
        
        <p>{description}</p>
        
        <b>Статус вашого облікового запису було змінено на {newStatus}</b>
        

        <p>З найкращими побажаннями, Адміністрація</p>
    </body>
    </html>
";
			return _emailSenderService.SendEmailAsync(email, "Сповіщення про зміну статусу вашого облікового запису", message);
		}
	}
}
