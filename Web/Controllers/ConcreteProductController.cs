using Domain.Models;
using Domain.Models.CalculateActionModels;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Math;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;
using Services.UserService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ConcreteProductController : ControllerBase
	{
		private readonly IConcreteProductService _concreteProductService;
		private readonly IUserService _userService;
		private readonly IPharmacyService _pharmacyService;
		private readonly ICityService _cityService;


		public ConcreteProductController(IConcreteProductService concreteProductService, ICityService cityService, IUserService userService, IPharmacyService pharmacyService)
		{
			this._concreteProductService = concreteProductService;
			this._cityService = cityService;
			this._userService = userService;
			this._pharmacyService = pharmacyService;
		}

		[HttpGet("")]
		public IActionResult GetAllConcreteProducts()
		{
			var result = _concreteProductService.GetAllConcreteProducts();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetConcreteProduct/{id}")]
		public IActionResult GetConcreteProduct(int id)
		{
			var result = _concreteProductService.GetConcreteProduct(a => a.Id == id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetSupInfoForProductInYourCity")]
		public IActionResult GetSupInfoForProductInYourCity(string city, int id)
		{
			var result = _concreteProductService.GetAllConcreteProducts(a => a.ProductID == id
			&&
			a.Pharmacy!.City!.NameCity == city && a.Quantity > 0, "Pharmacy,Pharmacy.City");
			if (!result.IsNullOrEmpty())
			{
				return Ok(new { minPrice = result.Min(a => a.Price), count = result.Count() });
			}
			return Ok(new { minPrice = 0.0, count = 0 });
		}

		[HttpGet("GetMinAndMaxPrice")]
		public IActionResult GetMinAndMaxPrice(string city, int id)
		{
			var result = _concreteProductService.GetAllConcreteProducts(a => a.ProductID == id
			&&
			a.Pharmacy!.City!.NameCity == city && a.Quantity > 0, "Pharmacy,Pharmacy.City");
			if (!result.IsNullOrEmpty())
			{
				return Ok(new { minPrice = result.Min(a => a.Price), maxPrice = result.Max(a => a.Price) });
			}
			return Ok(new { minPrice = 0.0, count = 0 });
		}

		[HttpGet("GetListOfConcreteProductInYourCity/{cityName}/{productId}")]
		public IActionResult GetListOfConcreteProductInYourCity(string cityName, int productId)
		{
			var cityRes = _cityService.GetCity(a => a.NameCity == cityName);
			if (cityRes is not null)
			{
				var result = _concreteProductService.GetAllConcreteProducts(
				  a => a.ProductID == productId
				  &&
				  a.Pharmacy.CityID == cityRes.Id, "Pharmacy,Product,Product.Manufacturer,Pharmacy.PharmaCompany");

				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("Coords/{latitude}/{longitude}/{productId}")]

		public IActionResult GetProductByCoords(string latitude, string longitude, int productId)
		{
			var result = _concreteProductService.GetConcreteProduct(x => x.ProductID == productId
			&& x.Pharmacy.Latitude == latitude
			&& x.Pharmacy.Longitude == longitude);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost("GetCountOfPagesForConcreteProductsFromPharmacy")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Pharmacist)]
		public async Task<IActionResult> GetCountOfPagesForConcreteProductsFromPharmacy(PageViewModel model)
		{
			User user = await _userService.GetUserByName(User.Identity.Name);
			var pharmacy = _pharmacyService.GetPharmacy(a => a.UserID == user.Id);

			var result = _concreteProductService.GetAllConcreteProducts(x =>
				x.PharmacyID == pharmacy.Id &&
				(
					x.Product.Brand.Name.Contains(model.Search) ||
					x.Product.Manufacturer.Name.Contains(model.Search) ||
					x.Product.Category.Title.Contains(model.Search)
				)
			, "Product,Product.Brand,Product.Manufacturer,Product.Category")
			.GroupBy(a => a.Product.Category.Title)
			   .SelectMany(group => group.Select(a => new ProductAdminCalculateModel
			   {
			   }).Prepend(new ProductAdminCalculateModel { IsTmp = true }));
			return Ok(model.GetCountOfPages(result.Count()));

			if (result is not null)
			{
				return Ok(model.GetCountOfPages(result.Count()));
			}
			return BadRequest("No records found");
		}

		[HttpPost("GetConcreteProductsFromPharmacy")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Pharmacist)]
		public async Task<IActionResult> GetAllConcreteProductsFromPharmacy(PageViewModel model)
		{
			User user = await _userService.GetUserByName(User.Identity.Name);
			var pharmacy = _pharmacyService.GetPharmacy(a => a.UserID == user.Id);


			int page = model.Page != null ? model.Page.Value - 1 : 0;
			bool isClearLast = false;

			/*var result = _concreteProductService.GetAllConcreteProducts(x =>
                x.PharmacyID == pharmacy.Id &&
                (
                    x.Product.Brand.Name.Contains(model.Search) ||
                    x.Product.Manufacturer.Name.Contains(model.Search) ||
                    x.Product.Category.Title.Contains(model.Search)
                )
            , "Product,Product.Brand,Product.Manufacturer,Product.Category")
                .Select(a => new
                {
                    a.Id,
                    a.Product.Title,
                    a.Product.PathToPhoto,
                    BrandName = a.Product.Brand.Name,
                    ManufacturerName = a.Product.Manufacturer.Name,
                    CategoryPathToPhoto = a.Product.Category.PathToPhoto,
                    CategoryName = a.Product.Category.Title,
                    CategoryId = a.Product.Category.Id,
                    a.Price,
                    a.Quantity,
                })
                .GroupBy(a => a.CategoryId)
                .SelectMany(a => a)
                .Skip(page * model.ItemsPerPage)
                .Take(model.ItemsPerPage)
                .GroupBy(a => new { a.CategoryId, a.CategoryName, a.CategoryPathToPhoto })
                .Select(a=> new { a.Key.CategoryId, a.Key.CategoryName, a.Key.CategoryPathToPhoto, data=a });
               
                */


			var products = _concreteProductService.GetAllConcreteProducts(x =>
				x.PharmacyID == pharmacy.Id &&
				(
					x.Product.Brand.Name.Contains(model.Search) ||
					x.Product.Manufacturer.Name.Contains(model.Search) ||
					x.Product.Category.Title.Contains(model.Search)
				)
			, "Product,Product.Brand,Product.Manufacturer,Product.Category")
				.Select(a => new
				{
					a.Id,
					a.Product.Title,
					a.Product.ShortDescription,
					a.Product.PathToPhoto,
					BrandName = a.Product.Brand.Name,
					ManufacturerName = a.Product.Manufacturer.Name,
					CategoryPathToPhoto = a.Product.Category.PathToPhoto,
					CategoryTitle = a.Product.Category.Title,
					CategoryId = a.Product.Category.Id,
					a.Price,
					a.Quantity,
				})
				.GroupBy(a => a.CategoryId)
				.SelectMany(group => group.Select(a => new ConcreteProductAdminCalculateModel
				{
					Id = a.Id,
					CategoryId = group.Key,
					CategoryPathToPhoto = a.CategoryPathToPhoto,
					CategoryTitle = a.CategoryTitle,
					Title = a.Title,
					Brand = a.BrandName,
					Manufacturer = a.ManufacturerName,
					ShortDescription = a.ShortDescription,
					PathToPhoto = a.PathToPhoto,
					Price = a.Price,
					Quantity = a.Quantity
				}).Prepend(new ConcreteProductAdminCalculateModel { IsTmp = true }))
				.Skip(page * model.ItemsPerPage)
				.TakeWhile((item, index) =>
				{

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
				.Where(a => a.IsTmp != true)
				.GroupBy(a => new { a.CategoryId, a.CategoryTitle, a.CategoryPathToPhoto })
				.Select(a => new { a.Key.CategoryTitle, a.Key.CategoryPathToPhoto, data = a.ToList() })
				.ToList();

			if (isClearLast)
			{
				products.Last().data.Clear();
			}

			return Ok(products);
		}

		[HttpGet("Search/{pharmacyId}/{title}")]
		public IActionResult SearchConcreteProductByPharmacy(int pharmacyId, string title)
		{
			var result = _concreteProductService.GetAllConcreteProducts(x => x.PharmacyID == pharmacyId && x.Product!.Title!.StartsWith(title), "Product");
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost("AddConcreteProductAsync")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Pharmacist)]
		public async Task<IActionResult> AddConcreteProductAsync([FromBody] PostProductToPharmacyViewModel viewModel)
		{
			User user = await _userService.GetUserByName(User.Identity.Name);
			if (user == null)
				return BadRequest("No records found");

			Pharmacy pharmacy = _pharmacyService.GetPharmacy(x => x.UserID == user.Id);
			if (pharmacy == null)
				return BadRequest("No records found");

			var product = _concreteProductService.GetConcreteProduct(a => a.ProductID == viewModel.ProductId &&
				a.PharmacyID == pharmacy.Id);
			if (viewModel.Id == null)
			{

				if (product != null)
					return BadRequest();
				ConcreteProduct concreteProduct = new ConcreteProduct()
				{
					ProductID = viewModel.ProductId.Value,
					Price = viewModel.Price.Value,
					Quantity = viewModel.Quantity.Value,
					PharmacyID = pharmacy.Id,
				};

				_concreteProductService.InsertConcreteProduct(concreteProduct);
			}
			else
			{
				ConcreteProduct concreteProduct =
					_concreteProductService.GetConcreteProduct(a => a.Id == viewModel.Id);
				concreteProduct.ProductID = viewModel.ProductId.Value;
				concreteProduct.Price = viewModel.Price.Value;
				concreteProduct.Quantity = viewModel.Quantity.Value;
				_concreteProductService.UpdateConcreteProduct(concreteProduct);

			}
			return Ok("Data inserted");
		}


		[HttpPut("{id}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Pharmacist)]
		public IActionResult UpdateConcreteProduct(int id, ConcreteProduct concreteProduct)
		{
			concreteProduct.Id = id;
			_concreteProductService.UpdateConcreteProduct(concreteProduct);
			return Ok("Updation done");
		}

		[HttpDelete("DeleteConcreteProduct/{id}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Pharmacist)]
		public async Task<IActionResult> DeleteConcreteProduct(int id)
		{
			var res = _concreteProductService.GetConcreteProduct(a => a.Id == id, "Pharmacy");
			User user = await _userService.GetUserByName(User.Identity.Name);

			if (res.Pharmacy.UserID == user.Id)
			{
				_concreteProductService.DeleteConcreteProduct(id);
				return Ok("Data Deleted");
			}

			return BadRequest();
		}
	}
}
