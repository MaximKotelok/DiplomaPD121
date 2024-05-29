using Domain.Dto;
using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Repository.Repository.Interfaces;
using Services.PharmacyCompanyService;
using Services.UserService;
using System.Transactions;
using Utility;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PharmaCompanyController : ControllerBase
    {
        private readonly IPharmaCompanyService _service;
        private readonly IRepositoryManager _repository;
        private readonly IUserService _userService;

        public PharmaCompanyController(IPharmaCompanyService service, IRepositoryManager repository, IUserService userService)
        {
            this._service = service;
            this._repository = repository;
            this._userService = userService;
        }

        [HttpGet("GetAllPharmaCompanies")]
        public IActionResult GetPharmaCompanies()
        {
            var result = _service.GetAllPharmaCompanies();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("GetPharmaCompanyById")]
        public IActionResult GetPharmaCompany(int companyId)
        {
            var result = _service.GetPharmaCompany(x => x.Id == companyId);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("GetPharmaComapnyAdmin/{companyId}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult GetPharmaComapnyAdmin(int companyId)
        {
            var result = _service.GetPharmaCompany(x => x.Id == companyId, "User");
            if (result is not null && result.User is not null)
            {
                return Ok(new PharmaCompanyAdminViewModel { PharmaCompanyId = companyId, Email = result.User.Email, Username = result.User.UserName });
            }
            return Ok(new PharmaCompanyAdminViewModel { PharmaCompanyId = companyId });
        }

        [HttpPost("UpsertPharmaCompany")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public async Task<IActionResult> UpsertPharmaCompany(PostPharmaCompanyViewModel postModel)
        {
            /*using var transaction = new TransactionScope();*/
            try
            {
                return Ok(await UpsertCompanyEntity(postModel));
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to upsert product. Error: {ex.Message}");
            }
        }

        [HttpPost("UpsertPharmaCompanyAdmin")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public async Task<IActionResult> UpsertPharmaCompanyAdmin(PharmaCompanyAdminViewModel postModel)
        {
            try
            {
                var pharmacy = _service.GetPharmaCompany(a => a.Id == postModel.PharmaCompanyId, "User");

                if (pharmacy != null)
                {
                    if (pharmacy.UserID == null)
                    {

                        var user = new UserRegistrationDto
                        {
                            UserName = postModel.Username,
                            Password = postModel.Password,
                            Email = postModel.Email,
                        };

                        user.Roles = new List<string>
                    {
                        SD.Role_PharmaCompany
                    };

                        if ((await _repository.UserAuthentication.RegisterUserAsync(user)).Succeeded)
                        {
                            User registrationResult = await _userService.GetUserByName(postModel.Username);

                            pharmacy.UserID = registrationResult.Id;
                            _service.UpdatePharmaCompany(pharmacy);
                            return Ok("Data inserted");
                        }
                    }

                    else
                    {
                        try
                        {

                            User user = await _userService.GetUserById(pharmacy.UserID);
                            if (user != null)
                            {

                                await _userService.ChangePasswordWithoutConfirmAsync(user.Id, postModel.Password);
                                await _userService.UpdateUser(user.Id, email: postModel.Email, userName: postModel.Username);

                                return Ok("Data updated");
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.Message);
                        }
                        return BadRequest($"Failed to update user");

                    }
                }
                return BadRequest($"Failed to upsert user");

                /* transaction.Complete();*/

            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to upsert product. Error: {ex.Message}");
            }
        }

        [HttpDelete("DeletePharmaCompany/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeletePharmaCompany(int id)
        {
            _service.DeletePharmaCompany(id);
            return Ok("Data Deleted");
        }

        private async Task<int> UpsertCompanyEntity(PostPharmaCompanyViewModel postModel)
        {

            if (postModel.Id == null)
            {
				var pharmaCompany = new PharmaCompany
				{
					Description = postModel.Description,
					Title = postModel.Title,
					PathToPhoto = postModel.PathToPhoto
				};

				_service.InsertPharmaCompany(pharmaCompany);
                return pharmaCompany.Id;
            }
            else
            {
                var pharmaCompany = _service.GetPharmaCompany(a => a.Id == postModel.Id.Value);
                
                pharmaCompany.Description = postModel.Description;
                pharmaCompany.Title = postModel.Title;
                pharmaCompany.PathToPhoto = postModel.PathToPhoto;
                    
                _service.UpdatePharmaCompany(pharmaCompany);
                return postModel.Id.Value;
            }
        }
    }
}
