using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Services.MailService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.Models;

namespace Services.EmailService
{
    public class MailKitService : IMailKitService
    {
        private readonly SendGridSettings _sendGridSettings;

        public MailKitService(IOptions<SendGridSettings> sendGridSettings)
        {
            _sendGridSettings = sendGridSettings.Value;
        }
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            using var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(_sendGridSettings.EmailName, _sendGridSettings.FromEmail));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using var client = new SmtpClient();
            await client.ConnectAsync("smtp.ethereal.email", 587, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_sendGridSettings.FromEmail, _sendGridSettings.EmailPassword);
            await client.SendAsync(emailMessage);

            await client.DisconnectAsync(true);

        }
    }
}