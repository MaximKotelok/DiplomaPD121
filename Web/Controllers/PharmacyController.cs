using Domain.Dto;
using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Repository.Repository.Interfaces;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;
using Services.UserService;
using System.Transactions;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PharmacyController : ControllerBase
	{
		private readonly IPharmacyService _pharmacyService;
		private readonly IPharmaCompanyService _companyService;
        private readonly ICityService _cityService;
		private readonly IRepositoryManager _repository;
		private readonly IUserService _userService;
		private readonly IConcreteProductService _concreteProductService;

		public PharmacyController(IPharmacyService service, IPharmaCompanyService companyService, ICityService _cityService, IRepositoryManager repository, IUserService userService, IConcreteProductService concreteProductService)
		{
			this._pharmacyService = service;
			this._cityService = _cityService;
			this._concreteProductService = concreteProductService;
			_repository = repository;
			_userService = userService;
            _companyService = companyService;
        }

		[HttpGet("")]
		public IActionResult GetAllPharmacies()
		{
			var result = _pharmacyService.GetAllPharmacies();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}
		[HttpPost("GetAllPharmaciesForAdmin")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult GetAllPharmaciesForAdmin(PageViewModel model)
		{
			var rawResult = _pharmacyService.GetAllPharmacies(includeProperties: "PharmaCompany,User");
			if (!model.Search.IsNullOrEmpty())
			{
				rawResult = rawResult.Where(a =>
				{
					return
					a.Id.ToString().StartsWith(model.Search) ||
					a.Address.StartsWith(model.Search) ||
					(a.User != null && a.User.Email.StartsWith(model.Search)) ||
					a.PharmaCompany.Title.StartsWith(model.Search);

				});
			}
			if (rawResult is not null)
			{
				int page = model.Page != null ? model.Page.Value - 1 : 0;
				var result = rawResult.Skip(model.ItemsPerPage * page).Take(model.ItemsPerPage)
					.Select(a => new { pharmacy = a, pharmacist = a.User != null ? a.User.Email : null })
					.GroupBy(a => new { a.pharmacy.PharmaCompany.Title, a.pharmacy.PharmaCompany.PathToPhoto }).Select(a => new
					{
						name = a.Key.Title,
                        pathToPhoto = a.Key.PathToPhoto,
						data = a
					});
				int countOfPages = model.GetCountOfPages(rawResult.Count());
				return Ok(new { data = result, countOfPages });


            }
            return BadRequest("No records found");
		}

		[HttpGet("/GetAllConcreteProductsFromPharmacy/{id}")]
		public IActionResult GetAllConcreteProductsFromPharmacy(int id)
		{
			var result = _pharmacyService.GetPharmacy(a => a.Id == id, "ConcreteProducts");
			if (result is not null)
			{
				return Ok(result.ConcreteProducts);
			}
			return BadRequest("Pharmacy not found");
		}

		[HttpGet("GetPharmacyProduct")]
		public IActionResult GetPharmacyProduct(int id, int productId)
		{
			var result = _pharmacyService.GetPharmacy(x => x.Id == id, "ConcreteProducts,ConcreteProducts.Product")?.ConcreteProducts;
			if (result is not null)
			{
				var product = result.First(a => a.Id == productId);
				return Ok(product);
			}
			return BadRequest("No records found");
		}

		[HttpGet("{id}")]
		public IActionResult GetPharmacy(int id)
		{
			var result = _pharmacyService.GetPharmacy(x => x.Id == id, "PharmaCompany");
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}
		[HttpGet("GetPharmacist/{id}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult GetPharmacist(int id)
		{
			var result = _pharmacyService.GetPharmacy(a => a.Id == id, "User");
			if (result is not null && result.User is not null)
			{
				return Ok(new PharmacistViewModel { PharmacyId = id, Email = result.User.Email, Username = result.User.UserName });
			}
			return Ok(new PharmacistViewModel { PharmacyId = id });

		}

		[HttpGet("Coords/{latitude}/{longitude}")]

		public IActionResult GetPharmacyByCoords(string latitude, string longitude)
		{
			var result = _pharmacyService.GetPharmacy(x => x.Latitude == latitude && x.Longitude == longitude);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetListOfPharmacyInYourCity/{cityName}")]
		public IActionResult GetListOfPharmacyInYourCity(string cityName)
		{
			var city = _cityService.GetCity(a => a.NameCity == cityName);
			if (city is not null)
			{
				var result = _pharmacyService.GetAllPharmacies(a => a.CityID == city.Id, "PharmaCompany");

				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetListOfPharmacyInYourCityByCompany/{cityName}/{companyId}")]
		public IActionResult GetListOfPharmacyInYourCity(string cityName, int companyId)
		{
			var city = _cityService.GetCity(a => a.NameCity == cityName);
			if (city is not null)
			{
				var result = _pharmacyService.GetAllPharmacies(a => a.CityID == city.Id && a.PharmaCompanyID == companyId, "PharmaCompany");

				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost("UpsertPharmacy")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public async Task<IActionResult> UpsertPharmact(PostPharmacyViewModel postModel)
		{
			try
			{
				return Ok(await UpsertPharmacyEntity(postModel));
			}
			catch (Exception ex)
			{
				return BadRequest($"Failed to upsert product. Error: {ex.Message}");
			}
		}

		[HttpPost("UpsertPharmacist")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public async Task<IActionResult> UpsertPharmacist(PharmacistViewModel postModel)
		{
			try
			{
				var pharmacy = _pharmacyService.GetPharmacy(a => a.Id == postModel.PharmacyId, "User");

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
						SD.Role_Pharmacist
					};

						if ((await _repository.UserAuthentication.RegisterUserAsync(user)).Succeeded)
						{
							User registrationResult = await _userService.GetUserByName(postModel.Username);

							pharmacy.UserID = registrationResult.Id;
							_pharmacyService.UpdatePharmacy(pharmacy);
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


		[HttpDelete("DeletePharmacy/{id}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult DeletePharmacy(int id)
		{
            /*using var transaction = new TransactionScope();*/

            var pharmacy = _pharmacyService.GetPharmacy(a => a.Id == id, "ConcreteProducts");
			if (pharmacy != null)
			{
				foreach (var item in pharmacy.ConcreteProducts)
				{
					_concreteProductService.DeleteConcreteProduct(item.Id);
				}
				_pharmacyService.DeletePharmacy(id);
			}

            /*transaction.Complete();*/
            return Ok("Data Deleted");
		}



		private async Task<int> UpsertPharmacyEntity(PostPharmacyViewModel postModel)
		{
			var pharmacy = new Pharmacy
			{
				Address = postModel.Address,
				WorkingWeekOpenTime = postModel.WorkingWeekOpenTime,
				WorkingWeekCloseTime = postModel.WorkingWeekCloseTime,
				WeekendOpenTime = postModel.WeekendOpenTime,
				WeekendCloseTime = postModel.WeekendCloseTime,
				Longitude = postModel.Longitude,
				Latitude = postModel.Latitude,
				PharmaCompanyID = postModel.PharmaCompanyID,
				CityID = postModel.CityID,
			};

			if (postModel.Id == null)
			{
				_pharmacyService.InsertPharmacy(pharmacy);
				return pharmacy.Id;
			}
			else
			{
				pharmacy.Id = postModel.Id.Value;
				_pharmacyService.UpdatePharmacy(pharmacy);
				return postModel.Id.Value;
			}
		}

	}
}
