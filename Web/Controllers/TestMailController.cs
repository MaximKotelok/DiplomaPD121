using Microsoft.AspNetCore.Mvc;
using Services.EmailService;
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
        [HttpGet]
        public IActionResult Index()
        {
            _emailService.SendBookingInfo("zella.kris7@ethereal.email", new ProductDto { Id = 1, Name = "Vit C" }).GetAwaiter().GetResult();
            return new EmptyResult();
        }
    }
}
