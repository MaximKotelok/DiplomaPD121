using AutoMapper;
using Domain.Dto;
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
        public AuthController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegistrationDto userRegistration)
        {

            var userResult = await _repository.UserAuthentication.RegisterUserAsync(userRegistration);
            return !userResult.Succeeded ? new BadRequestObjectResult(userResult) : StatusCode(201);
        }

    }
}
