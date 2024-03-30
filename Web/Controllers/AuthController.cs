using AutoMapper;
using Domain.Dto;
using Domain.Dtos;
using Domain.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Repository.Repository.Interfaces;
using Services.EmailService;
using Utility;
using Web.Filters;

namespace Web.Controllers
{
    [Route("api/userauthentication")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IRepositoryManager _repository;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        UserManager<User> _userManager;
        public AuthController(IRepositoryManager repository, IMapper mapper, UserManager<User> userManager, IEmailService emailService)
        {
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
            _emailService = emailService;
        }

        [HttpPost("register")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> RegisterUserAsync([FromBody] UserRegistrationDto userRegistration)
        {
            if (string.IsNullOrEmpty(userRegistration.Email))
                return BadRequest("Email is required.");
            if (string.IsNullOrEmpty(userRegistration.Password))
                return BadRequest("Password is required.");
            if (string.IsNullOrEmpty(userRegistration.UserName))
                return BadRequest("Username is required.");
            if (userRegistration.Roles.IsNullOrEmpty())
                userRegistration.Roles = new List<string> { SD.Role_Customer };
            var userResult = await _repository.UserAuthentication.RegisterUserAsync(userRegistration);
            if (userResult.Succeeded)
            {
                bool emailSent = await _emailService.SendConfirmationMail(userRegistration.Email);
                return emailSent
                    ? StatusCode(201, "User registered successfully.")
                    : StatusCode(500, "Failed to send confirmation email.");
            }
            return BadRequest(userResult.Errors.Select(error => error.Description));
        }

        [HttpPost("login")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> AuthenticateAsync([FromBody] UserLoginDto user)
        {
            var result = await _repository.UserAuthentication.ValidateUserAsync(user);

            if (result is not null)
            {
                var token = await _repository.UserAuthentication.CreateTokenAsync();
                return Ok(new { Token = token, User = result });
            }
            else
            {
                return Unauthorized("Invalid credentials");
            }
        }

        [HttpGet("confirm")]
        public async Task<IActionResult> ConfirmEmailAsync([FromQuery] string email)
        {
            return await _repository.UserAuthentication.ConfirmEmailAsync(email)
                ? Ok("Mail successfully confirmed")
                : BadRequest("Failed to confirm mail");
        }
    }
}
