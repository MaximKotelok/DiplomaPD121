using AutoMapper;
using Domain.Dto;
using Domain.Dtos;
using Domain.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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

        [Route("google-login")]
        public  IActionResult GoogleLogin()
        {
            var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse")};
            return Challenge(properties,GoogleDefaults.AuthenticationScheme);
        }
        [Route("google-response")]
        public async Task<IActionResult> GoogleResponse()
        {
            var result = await HttpContext.AuthenticateAsync(JwtBearerDefaults.AuthenticationScheme);
            var claims = result.Principal.Identities.FirstOrDefault().Claims.Select(claim => new
            {
                claim.Issuer,
                claim.OriginalIssuer,
                claim.Type,
                claim.Value
            });

            return Json(claims);
        }
        //[HttpPost]
        //[AllowAnonymous]
        //[Route("account/external-login")]
        //public IActionResult ExternalLogin(string provider, string returnUrl)
        //{
        //    var redirectUrl = $"https://api.domain.com/identity/v1/account/external-auth-callback?returnUrl={returnUrl}";
        //    var properties = signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
        //    properties.AllowRefresh = true;
        //    return Challenge(properties, provider);
        //}
    }
}
