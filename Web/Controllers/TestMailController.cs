﻿using Microsoft.AspNetCore.Mvc;
using Services.EmailService;
using Utility;
using Utility.Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestMailController : Controller
    {
        private readonly IEmailService _emailService;
        public TestMailController(IEmailService emailService)
        {
            _emailService = emailService;
        }
        [HttpPost()]
        public IActionResult Index(string? email)
        {
            _emailService.SendBookingInfo(email!, new ProductDto { Id = 1, Name = "Vit C" }).GetAwaiter().GetResult();
            return new EmptyResult();
        }
/*        [HttpPost("SendStatus")]
        public IActionResult SendStatus(string? email)
        {
            _emailService.SendChangeProductStatus(email!, new ProductDto { Id = 1, Name = "Vit C" }, SD.ProductStatusConfirmed).GetAwaiter().GetResult();
            return new EmptyResult();
        }*/
    }
}
