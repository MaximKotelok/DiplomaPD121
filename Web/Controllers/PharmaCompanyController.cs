using Domain.Dto;
using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Repository.Repository.Interfaces;
using Services.PharmacyCompanyService;
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

        public PharmaCompanyController(IPharmaCompanyService service, IRepositoryManager _repository) {
			this._service = service;
            this._repository = _repository;
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

        [HttpPost("UpsertPharmaCompany")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public async Task<IActionResult> UpsertBrand(PostPharmaCompanyViewModel postModel)
        {
            /*using var transaction = new TransactionScope();*/
            try
            {
                await UpsertCompanyEntity(postModel);

               /* transaction.Complete();*/
                return Ok("Data inserted");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to upsert product. Error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
                [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeletePharmCompany(int id)
		{
			_service.DeletePharmaCompany(id);
			return Ok("Data Deleted");
		}


        private async Task UpsertCompanyEntity(PostPharmaCompanyViewModel postModel)
        {
            var company = new PharmaCompany
            {
                Title = postModel.Title,
                Description = postModel.Description,
            };


            if (postModel.Id == null)
            {
                var user = new UserRegistrationDto
                {
                    UserName = postModel.Username,
                    Password = postModel.Password,
                    Email = postModel.Email,
                };

                user.Roles = new List<string>
                {
                    SD.Role_Company
                };

                _service.InsertPharmaCompany(company);
                await _repository.UserAuthentication.RegisterUserAsync(user);
            }
            else
            {
                company.Id = postModel.Id.Value;
                _service.UpdatePharmaCompany(company);
            }

            Console.WriteLine("added");
        }
    }
}
