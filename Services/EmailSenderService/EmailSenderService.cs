using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Utility.Models;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Services.SMTPService
{
    public class EmailSenderService : IEmailSenderService
    {
        private readonly SendGridSettings _sendGridSettings;
        private readonly ISendGridClient _sendGridClient;

        public EmailSenderService(ISendGridClient sendGridClient, IOptions<SendGridSettings> sendGridSettings)
        {
            _sendGridClient = sendGridClient;
            _sendGridSettings = sendGridSettings.Value;
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(_sendGridSettings.FromEmail, _sendGridSettings.EmailName),
                Subject = subject,
                HtmlContent = message
            };
            msg.AddTo(email);



           var res =  await _sendGridClient.SendEmailAsync(msg);
        }
    }
}
