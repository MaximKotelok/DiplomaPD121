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
using Microsoft.AspNetCore.Routing;
using Microsoft.IdentityModel.Tokens;
using Repository.Repository.Interfaces;
using SendGrid.Helpers.Mail;
using Services.EmailService;
using System.Security.Claims;
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
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthController(IRepositoryManager repository, IMapper mapper, UserManager<User> userManager, IEmailService emailService, SignInManager<User> signInManager)
        {
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
            _emailService = emailService;
            _signInManager = signInManager;
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
        /* [Route("external-login")]
         public async Task<IActionResult> ExternalAuthenticateAsync(string email)
         {
             var result = await _repository.UserAuthentication.ValidateExternalUserAsync(new UserLoginDto { Email = email });

             if (result is not null)
             {
                 var token = await _repository.UserAuthentication.CreateTokenAsync();
                 return Ok(new { Token = token, User = result });
             }
             else
             {
                 return Unauthorized("Invalid credentials");
             }
         }*/
        [HttpGet("confirm")]
        public async Task<IActionResult> ConfirmEmailAsync([FromQuery] string email)
        {
            return await _repository.UserAuthentication.ConfirmEmailAsync(email)
                ? Ok("Mail successfully confirmed")
                : BadRequest("Failed to confirm mail");
        }
        /*  [Route("external-login/google")]
          public IActionResult ExternalLoginGoogle(string provider = "Google", string? returnUrl = null)
          {
              var redirectUrl = Url.Action("ExternalLoginCallback", "Auth",
                                      new { ReturnUrl = returnUrl });

              var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);

              return new ChallengeResult(provider, properties);
          }
          [Route("external-login/facebook")]
          public IActionResult ExternalLoginFacebook(string provider = "Facebook", string? returnUrl = null)
          {
              var redirectUrl = Url.Action("ExternalLoginCallback", "Auth",
                                      new { ReturnUrl = returnUrl });

              var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);

              return new ChallengeResult(provider, properties);
          }
          public async Task<IActionResult> ExternalLoginCallback(string? returnUrl = null, string? remoteError = null)
          {
              returnUrl = returnUrl ?? Url.Content("~/");

              UserLoginDto loginViewModel = new UserLoginDto
              {
                  ReturnUrl = returnUrl,
                  ExternalLogins =
                          (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList()
              };

              if (remoteError != null)
              {
                  ModelState
                      .AddModelError(string.Empty, $"Error from external provider: {remoteError}");

                  return NotFound($"Error from external provider: {remoteError}");
              }

              // Get the login information about the user from the external login provider
              var info = await _signInManager.GetExternalLoginInfoAsync();
              if (info == null)
              {
                  ModelState
                      .AddModelError(string.Empty, "Error loading external login information.");

                  return NotFound("Error loading external login information.");
              }

              // If the user already has a login (i.e if there is a record in AspNetUserLogins
              // table) then sign-in the user with this external login provider
              var signInResult = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider,
                  info.ProviderKey, isPersistent: false, bypassTwoFactor: true);

              if (signInResult.Succeeded)
              {
                  // Get the email claim value
                  var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                  return LocalRedirect($"/api/userauthentication/external-login?email={email}");
              }
              // If there is no record in AspNetUserLogins table, the user may not have
              // a local account
              else
              {
                  // Get the email claim value
                  var email = info.Principal.FindFirstValue(ClaimTypes.Email);

                  if (email != null)
                  {
                      // Create a new user without password if we do not have a user already
                      var user = await _userManager.FindByEmailAsync(email);

                      if (user == null)
                      {
                          user = new User
                          {
                              UserName = info.Principal.FindFirstValue(ClaimTypes.Email),
                              Email = info.Principal.FindFirstValue(ClaimTypes.Email)
                          };

                          await _userManager.CreateAsync(user);
                      }

                      // Add a login (i.e insert a row for the user in AspNetUserLogins table)
                      await _userManager.AddLoginAsync(user, info);
                      await _signInManager.SignInAsync(user, isPersistent: false);

                      return LocalRedirect("");
                  }

                  return NotFound($"Email claim not received from: {info.LoginProvider}");
              }
          
      }*/
    }
}
