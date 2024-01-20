using AutoMapper;
using Domain.Dto;
using Domain.Dtos;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Repository.Repository.Interfaces;
using Web.Filters;

namespace Web.Controllers
{
    [Route("api/userauthentication")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        UserManager<User> _userManager;
        public AuthController(IRepositoryManager repository, IMapper mapper, UserManager<User> userManager)
        {
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpPost("register")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegistrationDto userRegistration)
        {

            var userResult = await _repository.UserAuthentication.RegisterUserAsync(userRegistration);
            return !userResult.Succeeded ? new BadRequestObjectResult(userResult) : StatusCode(201);
        }

        [HttpPost("login")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Authenticate([FromBody] UserLoginDto user)
        {
            return !await _repository.UserAuthentication.ValidateUserAsync(user)
                ? Unauthorized()
                : Ok(new { Token = await _repository.UserAuthentication.CreateTokenAsync() });
        }
        [HttpPost("confirm")]
        public async Task<IActionResult> ConfirmEmail(string token)
        {
            return await _repository.UserAuthentication.ConfirmEmailAsync(token)
                ? Ok()
                :BadRequest();
        }
    }
}
