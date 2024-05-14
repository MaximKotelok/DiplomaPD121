using Domain.Dto;
using Domain.Models;
using Domain.Models.CalculateActionModels;
using Domain.Models.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.IdentityModel.Tokens;
using Repository.Repository.Interfaces;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;
using Services.UserService;
using System.Data;
using System.Transactions;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PharmacyController : ControllerBase
	{
		private readonly IPharmacyService _pharmacyService;
		private readonly IPharmaCompanyService _pharmaCompany;
		private readonly ICityService _cityService;
		private readonly IRepositoryManager _repository;
		private readonly IUserService _userService;
		private readonly IConcreteProductService _concreteProductService;

		public PharmacyController(IPharmacyService service, ICityService _cityService,
			IRepositoryManager repository, IUserService userService,
			IConcreteProductService concreteProductService, IPharmaCompanyService pharmaCompany)
		{
			this._pharmacyService = service;
			this._cityService = _cityService;
			this._concreteProductService = concreteProductService;
			this._repository = repository;
			this._userService = userService;
			this._pharmaCompany = pharmaCompany;
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

		[HttpPost("GetCountOfPagesPharmaciesForAdmin")]
		public IActionResult GetCountOfPagesPharmaciesForAdmin(PagePharmacyViewModel model)
		{
			int page = model.Page != null ? model.Page.Value - 1 : 0;
			bool isClearLast = false;

			var pharmaCompanies = _pharmaCompany.GetAllPharmaCompanies(includeProperties: "Pharmacies,Pharmacies.User");

			if (model.IsDisplayOnlyCompanies != null && model.IsDisplayOnlyCompanies.Value) //Очищуємо аптеки якщо треба відобразити лише фарма компанії
			{
				pharmaCompanies = pharmaCompanies.Select(a =>
				{
					a.Pharmacies = new List<Pharmacy>();
					return a;
				});
			}

			int count = pharmaCompanies
				.SelectMany(a => a.Pharmacies.Count() > 0 ?
				(a.Pharmacies.Select(pharmacy =>
					new PharmacyAdminCalculateModel { PharmaCompany = a, Pharmacy = pharmacy }).Prepend(
						new PharmacyAdminCalculateModel { IsTmp = true })
				) :
					(new List<PharmacyAdminCalculateModel> { new PharmacyAdminCalculateModel { PharmaCompany = a, Pharmacy = null, IsTmp = true } })
					)
					.Where(a =>
					{
						if (a.IsTmp == true)
						{
							return true;
						}
						if (a.Pharmacy == null)
							return a.PharmaCompany!.Title!.Contains(model!.Search!);
						else
							return a.PharmaCompany!.Title!.Contains(model!.Search!) ||
							a.Pharmacy.Id.ToString().Contains(model.Search!) ||
							a.Pharmacy.Address.Contains(model.Search) ||
							(a.Pharmacy.User != null && a.Pharmacy.User.Email.Contains(model.Search)
						);
					}).Count();
			


			return Ok(model.GetCountOfPages(count));

		}

		[HttpPost("GetPharmaciesForAdmin")]
		public IActionResult GetPharmaciesForAdmin(PagePharmacyViewModel model)
		{
			int page = model.Page != null ? model.Page.Value - 1 : 0;
			int skipCount = page * model.ItemsPerPage;
			bool isClearLast = false;

			var pharmaCompanies = _pharmaCompany.GetAllPharmaCompanies(includeProperties: "Pharmacies,Pharmacies.User");

			if (model.IsDisplayOnlyCompanies != null && model.IsDisplayOnlyCompanies.Value) //Очищуємо аптеки якщо треба відобразити лише фарма компанії
			{
				pharmaCompanies = pharmaCompanies.Select(a =>
				{
					a.Pharmacies = new List<Pharmacy>();
					return a;
				});
			}

			var result = pharmaCompanies
				.SelectMany(a => a.Pharmacies.Count() > 0 ?
				(a.Pharmacies.Select(pharmacy =>
					new PharmacyAdminCalculateModel { PharmaCompany = a, Pharmacy = pharmacy }).Prepend(
						new PharmacyAdminCalculateModel { IsTmp = true })
				) :
					(new List<PharmacyAdminCalculateModel> { new PharmacyAdminCalculateModel { PharmaCompany = a, Pharmacy = null, IsTmp=true } })
					).Where(a =>
					{

						if (a.IsTmp == true)
						{
							return true;
						}
						else if (a.Pharmacy == null)
							return a.PharmaCompany!.Title!.Contains(model!.Search!);
						else
							return a.PharmaCompany!.Title!.Contains(model!.Search!) ||
							a.Pharmacy.Id.ToString().Contains(model.Search!) ||
							a.Pharmacy.Address.Contains(model.Search) ||
							(a.Pharmacy.User != null && a.Pharmacy.User.Email.Contains(model.Search)
						);
					})
					.Skip(skipCount)
					.TakeWhile((item, index) => {

						if (index < model.ItemsPerPage || (isClearLast && index == model.ItemsPerPage))
						{
							if (index == model.ItemsPerPage - 1 && item.IsTmp == true)
							{
								isClearLast = true;
							}
							return true;
						}
						return false;
					})
				.Where(a => !(a.IsTmp == true && a.PharmaCompany == null))

					.GroupBy(a => new
					{
						id = a.PharmaCompany.Id,
						name = a.PharmaCompany.Title,
						pathToPhoto = a.PharmaCompany.PathToPhoto
					}).Select(a => new
					{
						a.Key.id,
						a.Key.name,
						a.Key.pathToPhoto,
						data = a.Where(a => a.Pharmacy != null).Select(a => new
						{
							pharmacy = a.Pharmacy
						,
							pharmacist = a.Pharmacy.User != null
						? a.Pharmacy.User.Email : null
						}).ToList()
					}).ToList();
			if (isClearLast)
			{
				result.Last().data.Clear();
			}
			

			return Ok(result);

		}
		/*[HttpPost("GetAllPharmaciesForAdmin")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult GetAllPharmaciesForAdmin(PagePharmacyViewModel model)
		{
			var pharmacies = _pharmaCompany.GetAllPharmaCompanies(includeProperties: "Pharmacies,Pharmacies.User");

			if (model.IsDisplayOnlyCompanies != null && model.IsDisplayOnlyCompanies.Value)
				pharmacies = pharmacies.Select(a =>
				{
					a.Pharmacies = new List<Pharmacy>();
					return a;
				});

			var rawResult = pharmacies
				.SelectMany(a => a.Pharmacies.Count() > 0 ?
				a.Pharmacies.Select(pharmacy =>
				new PharmacyAdminCalculateModel { PharmaCompany = a, Pharmacy = pharmacy }) :
				new List<PharmacyAdminCalculateModel>{
					new() { PharmaCompany = a, Pharmacy = null }
				}
				);


			if (!model.Search.IsNullOrEmpty())
			{
				rawResult = rawResult.Where(a =>
				{
					if (a.Pharmacy == null)
						return a.PharmaCompany.Title.Contains(model.Search);
					else
						return a.PharmaCompany.Title.Contains(model.Search) ||
							a.Pharmacy.Id.ToString().Contains(model.Search) ||
							a.Pharmacy.Address.Contains(model.Search) ||
							(a.Pharmacy.User != null && a.Pharmacy.User.Email.Contains(model.Search)
						);
				});


			}


			if (rawResult is not null)
			{
				int page = model.Page != null ? model.Page.Value - 1 : 0;
				int skipNumber = model.ItemsPerPage * page;
				int takeNumber = model.ItemsPerPage;

				var result = rawResult
					.Skip(skipNumber)
					.Take(takeNumber)
					.GroupBy(a => new
					{
						id = a.PharmaCompany.Id,
						name = a.PharmaCompany.Title,
						pathToPhoto = a.PharmaCompany.PathToPhoto
					}).Select(a => new
					{
						a.Key.id,
						a.Key.name,
						a.Key.pathToPhoto,
						data = a.Where(a => a.Pharmacy != null).Select(a => new
						{
							pharmacy = a.Pharmacy
						,
							pharmacist = a.Pharmacy.User != null
						? a.Pharmacy.User.Email : null
						})
					});

				int countOfPages = model.GetCountOfPages(rawResult.Count());
				return Ok(new { data = result, countOfPages });


			}
			return BadRequest("No records found");
		}*/

		[HttpPost("GetAllPharmaciesForPharmaCompany")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_PharmaCompany)]
		public async Task<IActionResult> GetAllPharmaciesForPharmaCompany(PageViewModel model)
		{
			var user = await _userService.GetUserByName(User.Identity.Name);


			if (user == null)
			{
				return NoContent();
			}

			var pharmaCompany = _pharmaCompany.GetPharmaCompany(a => a.UserID == user.Id, includeProperties: "Pharmacies,Pharmacies.User");

			IEnumerable<Pharmacy> rawResult = pharmaCompany.Pharmacies;
			if (!model.Search.IsNullOrEmpty())
			{
				rawResult = rawResult.Where(a =>
				{
					return a.Id.ToString().Contains(model.Search) ||
						a.Address.Contains(model.Search) ||
						(a.User != null && a.User.Email.Contains(model.Search)
					);
				});


			}


			if (rawResult is not null)
			{
				int page = model.Page != null ? model.Page.Value - 1 : 0;
				int skipNumber = model.ItemsPerPage * page;
				int takeNumber = model.ItemsPerPage;

				var result = rawResult
					.Skip(skipNumber)
					.Take(takeNumber)
					.Select(a => new
					{
						pharmacy = a
						,
						pharmacist = a.User != null
						? a.User.Email : null
					})
					;

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
		[Authorize(AuthenticationSchemes = "Bearer", Roles = $"{SD.Role_Admin},{SD.Role_PharmaCompany}")]
		public async Task<IActionResult> GetPharmacist(int id)
		{
			var user = await _userService.GetUserByName(User.Identity.Name);

			if (user == null)
			{
				return NoContent();
			}

			var result = _pharmacyService.GetPharmacy(a => a.Id == id, "User,PharmaCompany");

			if (result is not null && result.User is not null)
			{
				if ((await _userService.GetRolesAsync(user.Id)).Contains(SD.Role_Admin)
				|| result.PharmaCompany.UserID == user.Id)
					return Ok(new PharmacistViewModel { PharmacyId = id, Email = result.User.Email, Username = result.User.UserName });
				else
					return Forbid();
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
		[Authorize(AuthenticationSchemes = "Bearer", Roles = $"{SD.Role_Admin},{SD.Role_PharmaCompany}")]
		public async Task<IActionResult> UpsertPharmacy(PostPharmacyViewModel postModel)
		{
			var user = await _userService.GetUserByName(User.Identity.Name);
			var roles = (await _userService.GetRolesAsync(user.Id));

			if (user == null)
			{
				return NoContent();
			}
			var result = _pharmaCompany.GetPharmaCompany(a => a.UserID == user.Id);
			try
			{
				if (!roles.Contains(SD.Role_Admin) && roles.Contains(SD.Role_PharmaCompany))
				{

					if (postModel.Id != null)
					{
						var pharmacy = _pharmacyService.GetPharmacy(a => a.Id == postModel.Id,
							"PharmaCompany"
							);
						if (pharmacy == null || pharmacy.PharmaCompany.UserID != user.Id)
							return Forbid();


					}
					postModel.PharmaCompanyID = result.Id;
				}


				if (roles.Contains(SD.Role_Admin)
					|| (result.Id == postModel.PharmaCompanyID))
					return Ok(await UpsertPharmacyEntity(postModel));
				else
					return Forbid();

			}
			catch (Exception ex)
			{
				return BadRequest($"Failed to upsert product. Error: {ex.Message}");
			}
		}

		[HttpPost("UpsertPharmacist")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = $"{SD.Role_Admin},{SD.Role_PharmaCompany}")]
		public async Task<IActionResult> UpsertPharmacist(PharmacistViewModel postModel)
		{
			var user = await _userService.GetUserByName(User.Identity.Name);

			if (user == null)
			{
				return NoContent();
			}
			try
			{
				var pharmacy = _pharmacyService.GetPharmacy(a => a.Id == postModel.PharmacyId, "User,PharmaCompany");
				if ((await _userService.GetRolesAsync(user.Id)).Contains(SD.Role_Admin)
					|| pharmacy.PharmaCompany.UserID == user.Id)
				{

					if (pharmacy != null)
					{
						if (pharmacy.UserID == null)
						{

							var pharmaUser = new UserRegistrationDto
							{
								UserName = postModel.Username,
								Password = postModel.Password,
								Email = postModel.Email,
							};

							pharmaUser.Roles = new List<string>
					{
						SD.Role_Pharmacist
					};

							if ((await _repository.UserAuthentication.RegisterUserAsync(pharmaUser)).Succeeded)
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

								User pharmaUser = await _userService.GetUserById(pharmacy.UserID);
								if (pharmaUser != null)
								{

									await _userService.ChangePasswordWithoutConfirmAsync(pharmaUser.Id, postModel.Password);
									await _userService.UpdateUser(pharmaUser.Id, email: postModel.Email, userName: postModel.Username);

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
					else
					{
						return Forbid();
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
			using var transaction = new TransactionScope();

			var pharmacy = _pharmacyService.GetPharmacy(a => a.Id == id, "ConcreteProducts");
			if (pharmacy != null)
			{
				foreach (var item in pharmacy.ConcreteProducts)
				{
					_concreteProductService.DeleteConcreteProduct(item.Id);
				}
				_pharmacyService.DeletePharmacy(id);
			}

			transaction.Complete();
			return Ok("Data Deleted");
		}



		private async Task<int> UpsertPharmacyEntity(PostPharmacyViewModel postModel)
		{


			if (postModel.Id == null)
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
					PharmaCompanyID = postModel.PharmaCompanyID.Value,
					CityID = postModel.CityID,
				};
				_pharmacyService.InsertPharmacy(pharmacy);
				return pharmacy.Id;
			}
			else
			{
				var pharmacy = _pharmacyService.GetPharmacy(a => a.Id == postModel.Id.Value);
				pharmacy.Address = postModel.Address;
				pharmacy.WorkingWeekOpenTime = postModel.WorkingWeekOpenTime;
				pharmacy.WorkingWeekCloseTime = postModel.WorkingWeekCloseTime;
				pharmacy.WeekendOpenTime = postModel.WeekendOpenTime;
				pharmacy.WeekendCloseTime = postModel.WeekendCloseTime;
				pharmacy.Longitude = postModel.Longitude;
				pharmacy.Latitude = postModel.Latitude;
				pharmacy.PharmaCompanyID = postModel.PharmaCompanyID.Value;
				pharmacy.CityID = postModel.CityID;
				_pharmacyService.UpdatePharmacy(pharmacy);
				return postModel.Id.Value;
			}
		}

	}
}
