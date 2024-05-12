using DataAccess.Migrations;
using Domain.Models;
using Domain.Models.CalculateActionModels;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using Services.AttributeService;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.EmailService;
using Services.MedicineService;
using Services.PharmacyCompanyService;
using Services.ProductConfirmService;
using Services.ProductStatusService;
using Services.PropertyService;
using Services.ReservationService;
using Services.UserService;
using System.Collections;
using System.Collections.Generic;
using System.Security.Principal;
using System.Transactions;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductController : ControllerBase
	{
		private readonly IProductService _productService;
		private readonly IMedicineService _medicineService;
		private readonly IAttributeService _attributeService;
		private readonly IPropertyService _propertyService;
		private readonly ICityService _cityService;
		private readonly IConcreteProductService _concreteProductService;
		private readonly IProductStatusService _productStatusService;
		private readonly IProductConfirmService _productConfirmService;
		private readonly IReservationService _reservationService;
		private readonly IUserService _userService;
		private readonly IEmailService _emailService;

		public ProductController(
				IProductService productService,
				IAttributeService attributeService,
				IPropertyService propertyService,
				ICityService cityService,
				IConcreteProductService concreteProductService,
				IMedicineService medicineService,
				IProductStatusService productStatusService,
				IProductConfirmService productConfirmService,
				IReservationService reservationService,
				IUserService userService,
				IEmailService emailService
			)
		{

			this._productConfirmService = productConfirmService;
			this._productService = productService;
			this._cityService = cityService;
			this._medicineService = medicineService;
			this._attributeService = attributeService;
			this._propertyService = propertyService;
			this._concreteProductService = concreteProductService;
			this._productStatusService = productStatusService;
			this._reservationService = reservationService;
			this._userService = userService;
			this._emailService = emailService;
		}

		private IEnumerable<ProductProperty> _convertProperties(List<PropertyViewModel> properties)
		{
			if (!properties.IsNullOrEmpty())
			{

				var names = properties.Select(a => a.Id).ToList();
				IEnumerable<ProductAttribute> productsAttributes = _attributeService
					.GetAllAttributes(a => names.Contains(a.Id));

				if (productsAttributes.Count() != properties.Count())
					throw new Exception();

				return productsAttributes.Select(a => new ProductProperty { Attribute = a, Value = properties!.FirstOrDefault(b => b.Id == a.Id)!.Value });
			}
			return new List<ProductProperty>();


		}
		[HttpGet("GetPriceHistory")]
		public IActionResult GetPriceHistory(int id)
		{
			Product product = _productService!.GetProduct(a => a.Id == id, includeProperties: "PriceHistory,PriceHistory.HistoryDate")!;

			return Ok(product.PriceHistory.OrderBy(a => a.HistoryDate.Date).Select((a) => new
			{
				date = a.HistoryDate.Date.ToString("MM.yy"),
				price = a.Price
			}).GroupBy(a => a.date).Select(a => new { name = a.Key, value = a.Average(b => b.price) }).TakeLast(12));
		}

		[HttpGet("GetById")]
		public IActionResult GetProduct(int id)
		{
			Product product = _productService!.GetProduct(a => a.Id == id, includeProperties: "Properties,Properties,Properties.Attribute,ProductConfirm,ProductConfirm.ProductStatus")!;

			if (product is not null && (product.ProductConfirm == null || product!.ProductConfirm!.ProductStatus!.Status!.Equals(SD.ProductStatusConfirmed)))
			{
				ProductViewModel productView = new ProductViewModel
				{
					Id = product.Id,
					CategoryID = product.CategoryID,
					Title = product.Title,
					ShortDescription = product.ShortDescription,
					ProductAttributeGroupID = product.ProductAttributeGroupID,
					ManufacturerID = product.ManufacturerID,
					BrandID = product.BrandID,
					Description = product.Description,
					PathToPhoto = product.PathToPhoto,
					Properties = product.Properties!.Select(a => new PropertyViewModel { Value = a.Value, Id = a.Attribute!.Id, Name = a.Attribute.Name }).ToList()

				};


				product = _medicineService.GetMedicine(a => a.Id == id, includeProperties: "ActiveSubstance")!;
				if (product is not null)
				{
					MedicineViewModel res = new MedicineViewModel { Product = productView };
					res.ActiveSubstance = ((Medicine)product).ActiveSubstance!.Title;
					res.ActiveSubstanceID = ((Medicine)product).ActiveSubstance!.Id;

					PermissionIdWithDescription[] medicineTable = {
						new PermissionIdWithDescription{ Id= ((Medicine)product).AdultsID, Description= "Дорослі" },
						new PermissionIdWithDescription{ Id= ((Medicine)product).ChildrenID,Description="Діти" },
						new PermissionIdWithDescription{ Id= ((Medicine)product).PregnantID,Description="Вагітні" },
						new PermissionIdWithDescription{ Id= ((Medicine)product).NursingMothersID,Description="Годуючі мами" },
						new PermissionIdWithDescription{ Id= ((Medicine)product).AllergiesID, Description="Алергіки" },
						new PermissionIdWithDescription{ Id= ((Medicine)product).DiabeticsID, Description="Діабетики" },
						new PermissionIdWithDescription{ Id= ((Medicine)product).DriversID, Description="Водії" },
					};

					res.MedicineTable = medicineTable;

					return Ok(res);
				}

				return Ok(productView);
			}


			return BadRequest("No records found");
		}

		[HttpGet("GetProductByIdForAdmins")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult GetProductByIdForAdmins(int id)
		{
			Product product = _productService!.GetProduct(a => a.Id == id, includeProperties: "Properties,Properties,Properties.Attribute,ProductConfirm,ProductConfirm.ProductStatus,Manufacturer,Brand")!;

			if (product is not null)
			{
				ProductViewModel productView = new ProductViewModel
				{
					Id = product.Id,

					CategoryID = product.CategoryID,
					Title = product.Title,
					ShortDescription = product.ShortDescription,
					ProductAttributeGroupID = product.ProductAttributeGroupID,
					ManufacturerID = product.ManufacturerID,
					Manufacturer = product.Manufacturer.Name,
					BrandID = product.BrandID,
					Brand = product.Brand.Name,
					Description = product.Description,
					PathToPhoto = product.PathToPhoto,
					Properties = product.Properties!.Select(a => new PropertyViewModel { Value = a.Value, Id = a.Attribute!.Id, Name = a.Attribute.Name }).ToList()

				};


				product = _medicineService.GetMedicine(a => a.Id == id, includeProperties: "ActiveSubstance")!;
				if (product is not null)
				{
					MedicineViewModel res = new MedicineViewModel { Product = productView };
					res.ActiveSubstance = ((Medicine)product).ActiveSubstance!.Title;
					res.ActiveSubstanceID = ((Medicine)product).ActiveSubstance!.Id;

					PermissionIdWithDescription[] medicineTable = {
						new PermissionIdWithDescription{ Id= ((Medicine)product).AdultsID, Description= "Дорослі" },
						new PermissionIdWithDescription{ Id= ((Medicine)product).ChildrenID,Description="Діти" },
						new PermissionIdWithDescription{ Id= ((Medicine)product).PregnantID,Description="Вагітні" },
						new PermissionIdWithDescription{ Id= ((Medicine)product).NursingMothersID,Description="Годуючі мами" },
						new PermissionIdWithDescription{ Id= ((Medicine)product).AllergiesID, Description="Алергіки" },
						new PermissionIdWithDescription{ Id= ((Medicine)product).DiabeticsID, Description="Діабетики" },
						new PermissionIdWithDescription{ Id= ((Medicine)product).DriversID, Description="Водії" },
					};

					res.MedicineTable = medicineTable;

					return Ok(res);
				}

				return Ok(productView);
			}


			return BadRequest("No records found");
		}

		[HttpGet("GetForPharmacyById")]
		public IActionResult GetForPharmacyById(int id)
		{
			Product product = _productService!.GetProduct(a => a.Id == id, includeProperties: "Manufacturer,ProductConfirm,ProductConfirm.ProductStatus")!;

			if (product == null || (product.ProductConfirm != null && !product!.ProductConfirm!.ProductStatus!.Status!.Equals(SD.ProductStatusConfirmed)))
				return BadRequest("No records found");

			ProductToPharmacyViewModel viewModel = new()
			{
				Id = product.Id,
				Title = product.Title,
				ShortDescription = product.ShortDescription,
				Manufacturer = product.Manufacturer.Name,
				PathToPhoto = product.PathToPhoto,
			};

			return Ok(viewModel);
		}


		[HttpGet("GetAll")]
		public IActionResult GetAll()
		{
			var result = _productService
				.GetAllProducts(includeProperties: "Manufacturer,ProductConfirm,ProductConfirm.ProductStatus")
				.Where(a => (a.ProductConfirm == null || a!.ProductConfirm!.ProductStatus!.Status!.Equals(SD.ProductStatusConfirmed)));
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		private IEnumerable<Product> filter(IEnumerable<Product> products, SearchViewModel model)
		{
			var res = products
				.Where(a => (a.ProductConfirm == null || a!.ProductConfirm!.ProductStatus!.Status!.Equals(SD.ProductStatusConfirmed)))
				.Where(a =>
				{
					if (model.Brands != null && model.Brands.Length > 0)
					{
						return model.Brands.Contains(a.BrandID!.Value);
					}
					return true;
				}
				)
				.Where(a =>
				{
					if (model.Categories != null && model.Categories.Length > 0)
					{
						return model.Categories.Contains(a.CategoryID!.Value);
					}
					return true;
				}
				)
				.Where(a =>
				{
					if (model.Properties != null && model.Properties.Length > 0)
					{
						return a.Properties!.Any(b =>
						model.Properties.Any(c => (c.Name == b.Attribute.Name && b.Value == c.Value))

						);
					}
					return true;
				}
				);
			foreach(var item in res)
			{
				item.ProductConfirm = null;
			}
			return res;
		}

		private IEnumerable<Product> orderBy(IEnumerable<Product> products, SearchViewModel model)
		{
			if (model.OrderBy == null || model.OrderBy == SD.ByName)
				return products.OrderBy(a => a.Title);
			else if (model.OrderBy == SD.ByNameDesc)
				return products.OrderByDescending(a => a.Title);
			else if (model.OrderBy == SD.ByPrice)
				return products.OrderBy(a =>
				{

					if (a.PriceHistory.IsNullOrEmpty())
						return 0;
					else
						return a.PriceHistory
										.GroupBy(a => a.HistoryDate.Date)
										.OrderByDescending(a => a.Key).First().Average(a => a.Price);
				});
			else if (model.OrderBy == SD.ByPriceDesc)
				return products.OrderByDescending(a =>
				{

					if (a.PriceHistory.IsNullOrEmpty())
						return 0;
					else
						return a.PriceHistory
										.GroupBy(a => a.HistoryDate.Date)
										.OrderByDescending(a => a.Key).First().Average(a => a.Price);
				});
			else
				return products;

		}

		[HttpPost("GetSearchInput")]
		public IActionResult GetSearchInput([FromBody] SearchViewModel model)
		{
			IEnumerable<Product> result;
			if (model.ActiveSubstanceId == null)
			{

				result = filter(_productService
					.GetAllProducts(includeProperties: "Manufacturer,Properties,Properties.Attribute,Category,Brand,Category,ProductConfirm,ProductConfirm.ProductStatus")

					, model);
			}
			else
			{
				result = filter(_medicineService.GetAllMedicines(includeProperties: "Manufacturer,Properties,Properties.Attribute,Category,Brand,Category,ProductConfirm,ProductConfirm.ProductStatus").Where(a => a.ActiveSubstanceID == model.ActiveSubstanceId)
					, model);
			}


			if (result is not null)
			{
				Dictionary<string, List<string>> attributes = new Dictionary<string, List<string>>();
				foreach (var product in result)
				{
					foreach (var property in product.Properties)
					{
						var value = property.Value;
						var name = property.Attribute!.Name;
						if (!name.IsNullOrEmpty() && !value.IsNullOrEmpty())
						{
							var attributeName = name ?? "";
							var attributeValue = value;
							if (!attributes.TryGetValue(attributeName, out _))
							{
								attributes.Add(attributeName, new List<string>());
							}
							if (!attributes[attributeName].Any(a => a == attributeValue))
							{
								attributes[attributeName].Add(attributeValue);
							}
						}

					}

				};

				Dictionary<int, string> categories = new Dictionary<int, string>();

				foreach (var product in result)
				{
					if (!categories.TryGetValue(product.CategoryID.Value, out _))
						categories.Add(product.CategoryID.Value, product.Category.Title);
				}

				Dictionary<int, string> brands = new Dictionary<int, string>();

				foreach (var product in result)
				{
					if (!brands.TryGetValue(product.BrandID.Value, out _))
						brands.Add(product.BrandID.Value, product.Brand.Name);
				}


				return Ok(new { attributes, categories, brands, OrderByNames = SD.OrderByNames });
			}
			return BadRequest("No records found");
		}

		[HttpPost("Search")]
		public IActionResult Search([FromBody] SearchViewModel model)
		{

			IEnumerable<Product> result;
			if (model.ActiveSubstanceId == null)
			{

				result = filter(orderBy(_productService.GetAllProducts(includeProperties: "Manufacturer,Properties,Properties.Attribute,Category,Brand,Category,PriceHistory,PriceHistory.HistoryDate,ProductConfirm,ProductConfirm.ProductStatus")
					, model), model).Where(a =>
					{
						if (model.Title != null)
						{
							return a.Title!.StartsWith(model.Title);
						}
						return true;
					}
				).ToList();
			}
			else
			{
				result = filter(orderBy(_medicineService.GetAllMedicines(includeProperties: "Manufacturer,Properties,Properties.Attribute,Category,Brand,Category,PriceHistory,PriceHistory.HistoryDate,ProductConfirm,ProductConfirm.ProductStatus")
					.Where(a => a.ActiveSubstanceID == model.ActiveSubstanceId)
					.Where(a =>
					{
						if (model.Title != null)
						{
							return a.Title!.StartsWith(model.Title);
						}
						return true;
					}
				), model)
					, model);
			}

			if (result is not null)
			{

				int countOfPages = (int)Math.Ceiling(Convert.ToDouble(result.Count()) / Convert.ToDouble(model.ItemsPerPage));
				int page = model.Page != null ? model.Page.Value - 1 : 0;
				var products = result.Skip(model.ItemsPerPage * page).Take(model.ItemsPerPage);
				return Ok(new { products, countOfPages });
			}
			return BadRequest("No records found");
		}
		[HttpPost("GetCountOfPagesForProductsAdmin")]
		public IActionResult GetCountOfPagesForProductsAdmin([FromBody] PageViewModel model)
		{
			var products = _productService.GetAllProducts(includeProperties: "Category,Brand,Manufacturer")
			   .Where(a =>
			   {
				   return model.Search.IsNullOrEmpty()
				   || a.Category.Title.Contains(model.Search)
				   || a.Title.Contains(model.Search)
				   || a.Brand.Name.Contains(model.Search)
				   || a.Manufacturer.Name.Contains(model.Search)
				   || a.ShortDescription.Contains(model.Search);
			   })
				.GroupBy(a => a.Category.Title)
			   .SelectMany(group => group.Select(a => new ProductAdminCalculateModel
			   {
			   }).Prepend(new ProductAdminCalculateModel { IsTmp = true }));
			return Ok(model.GetCountOfPages(products.Count()));
		}

		[HttpPost("GetProductsAdmin")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]

		public IActionResult GetProductsAdmin([FromBody] PageViewModel model)
		{
			int page = model.Page != null ? model.Page.Value - 1 : 0;
			bool isClearLast = false;

			var products = _productService.GetAllProducts(includeProperties: "Category,Brand,Manufacturer")
				.Where(a =>
				{
					return model.Search.IsNullOrEmpty()
					|| a.Category.Title.Contains(model.Search)
					|| a.Title.Contains(model.Search)
					|| a.Brand.Name.Contains(model.Search)
					|| a.Manufacturer.Name.Contains(model.Search)
					|| a.ShortDescription.Contains(model.Search);
				})
				.GroupBy(a => a.Category.Title)
				.SelectMany(group => group.Select(a => new ProductAdminCalculateModel
				{

					CategoryId = a.Category.Id,
					CategoryPathToPhoto = a.Category.PathToPhoto,
					CategoryTitle = a.Category.Title,
					Title = a.Title,
					Brand = a.Brand.Name,
					Manufacturer = a.Manufacturer.Name,
					ShortDescription = a.ShortDescription,
					PathToPhoto = a.PathToPhoto,
				}).Prepend(new ProductAdminCalculateModel { IsTmp = true }))
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

		[HttpGet("")]
		public IActionResult GetProductOffer(int count)
		{
			var result = _productService
				.GetAllProducts(includeProperties: "Manufacturer,ProductConfirm,ProductConfirm.ProductStatus")
				.Where(a => (a.ProductConfirm == null || a!.ProductConfirm!.ProductStatus!.Status!.Equals(SD.ProductStatusConfirmed))).TakeLast(count);
			if (result is not null)
			{
				var products =
					result.Select(a =>
					new HomeProductViewModel
					{
						Id = a.Id,
						Manufacturer = a.Manufacturer!.Name,
						Title = a.Title,
						ShortDescription = a.ShortDescription,
						PathToPhoto = a.PathToPhoto
					}
					);
				return Ok(products);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetProductByTitle")]
		public IActionResult GetProductByTitle(string title, int count)
		{
			var result = _productService
				.GetAllProducts(a => a.Title.StartsWith(title), "ProductConfirm,ProductConfirm.ProductStatus").Take(count)
				.Where(a => (a.ProductConfirm == null || a!.ProductConfirm!.ProductStatus!.Status!.Equals(SD.ProductStatusConfirmed)));
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetTopOffers")]
		public IActionResult GetTopOffers(int count)
		{
			var result = _productService
				.GetAllProducts(includeProperties: "Manufacturer,ConcreteProducts,ConcreteProducts.ReservationItems,ConcreteProducts.ReservationItems.Reservation,ConcreteProducts.ReservationItems.Reservation.Status,Category,ProductConfirm,ProductConfirm.ProductStatus")
				.Where(a => (a.ProductConfirm == null || a!.ProductConfirm!.ProductStatus!.Status!.Equals(SD.ProductStatusConfirmed)))
				.Select(a => new HomeProductViewModel
				{
					Id = a.Id,
					Manufacturer = a.Manufacturer!.Name,
					CategoryName = a.Category!.Title,
					Title = a.Title,
					ShortDescription = a.ShortDescription,
					PathToPhoto = a.PathToPhoto,
					Popularity = a.ConcreteProducts
						.Select(b => b.ReservationItems
						.Where(a => a.Reservation.Status.Status == SD.ReservationStatusFinished)
						.Count()
					).Sum(a => a)
				}).OrderByDescending(a => a.Popularity)
				.GroupBy(a => a.CategoryName)
				.OrderByDescending(a => a.Sum(a => a.Popularity))
				.Take(3).Select(a => new
				{
					title = a.Key,
					data = a.Take(count)
				});
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost("GetAllProductsFromIdArray")]
		public IActionResult GetAllProductsFromIdArray(IEnumerable<int> ids)
		{
			int[] idArray = ids.ToArray();
			if (idArray.IsNullOrEmpty())
				return Ok("idArray is empty");


			var result = _productService
				.GetAllProducts(a => idArray.Contains(a.Id), includeProperties: "Manufacturer,ProductConfirm,ProductConfirm.ProductStatus")
				.Where(a => (a.ProductConfirm == null || a!.ProductConfirm!.ProductStatus!.Status!.Equals(SD.ProductStatusConfirmed)))
				.OrderBy(a => Array.IndexOf(idArray, a.Id));
			if (result is not null)
			{
				var products =
					result.Select(a =>
					new HomeProductViewModel
					{
						Id = a.Id,
						Manufacturer = a!.Manufacturer!.Name,
						Title = a.Title,
						ShortDescription = a.ShortDescription,
						PathToPhoto = a.PathToPhoto
					}
					);
				return Ok(products);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetListOfConcreteProductInYourCity/{cityName}/{productId}")]
		public IActionResult GetListOfConcreteProductInYourCity(int productId, string cityName)
		{
			var city = _cityService.GetCity(a => a.NameCity == cityName);
			if (city is not null)
			{
				var result = _concreteProductService.GetAllConcreteProducts(
					a => a.ProductID == productId
					&&
					a.Pharmacy!.CityID == city.Id, "Pharmacy");

				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("GetPopularProduct/{count}")]
		public IActionResult GetPopularProduct(int count = 5)
		{
			try
			{
				var reservations = _reservationService.GetAllReservations(includeProperties: "ReservationItems,ReservationItems.ConcreteProduct");

				var popularProducts = reservations
					.SelectMany(a => a.ReservationItems.Select(a => a.ConcreteProduct))
					.GroupBy(r => r.ProductID)
					.Select(g => new
					{
						ConcreteProductID = g.Key,
						ReservationCount = g.Count()
					})
					.OrderByDescending(x => x.ReservationCount)
					.Take(count)
					.ToList();

				var result = popularProducts.Select(p => p.ConcreteProductID).ToList();

				return Ok(result);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "Internal server error");
			}
		}

		//Update - admin
		//Add - pharamacy & admin
		[HttpPost("UpsertProduct")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = $"{SD.Role_Admin} ${SD.Role_Pharmacist}")]
		public async Task<IActionResult> UpsertProduct(PostProductViewModel postModel)
		{
			var user = await _userService.GetUserByName(User.Identity.Name);
			if (postModel.Id != null && !(await _userService.GetRolesAsync(user.Id)).Contains(SD.Role_Admin))
			{
				return StatusCode(403);
			}
			using var transaction = new TransactionScope();
			try
			{

				if (postModel.ActiveSubstanceID is not null)
					UpsertMedicine(postModel, (await _userService.GetRolesAsync(user.Id)).Contains(SD.Role_Admin));
				else
					UpsertProductEntity(postModel, (await _userService.GetRolesAsync(user.Id)).Contains(SD.Role_Admin));

				transaction.Complete();
				return Ok("Data inserted");
			}
			catch (Exception ex)
			{
				return BadRequest($"Failed to upsert product. Error: {ex.Message}");
			}
			finally
			{
				transaction.Dispose();
			}
		}

		private void UpsertMedicine(PostProductViewModel postModel, bool isAdmin)
		{

			var props = (ICollection<ProductProperty>)_convertProperties(postModel!.Properties!).ToList();
			var medicine = new Medicine
			{
				Title = postModel.Title,
				CategoryID = postModel.CategoryID,
				PathToPhoto = postModel.PathToPhoto,
				Description = postModel.Description,
				ShortDescription = postModel.ShortDescription,
				ManufacturerID = postModel.ManufacturerID,
				BrandID = postModel.BrandID,
				ActiveSubstanceID = postModel.ActiveSubstanceID.Value,
				Properties = _convertProperties(postModel!.Properties!).ToList(),
				ProductAttributeGroupID = postModel.ProductAttributeGroupID,
				AdultsID = postModel.AdultsID,
				AllergiesID = postModel.AllergiesID,
				ChildrenID = postModel.ChildrenID,
				DiabeticsID = postModel.DiabeticsID,
				DriversID = postModel.DriversID,
				NursingMothersID = postModel.NursingMothersID,
				PregnantID = postModel.PregnantID,

			};
			if (!isAdmin)
			{
				if (postModel.Id != null)
				{
					return;
				}
				var productConfirm = new ProductConfirm
				{
					PharmacompanyID = postModel.PharmaCompanyID,
					ProductStatusID = _productStatusService.GetProductStatusByName(SD.ProductStatusUnderConsideration).Id,
					CreationDate = DateTime.Now
				};
				medicine.ProductConfirm = productConfirm;

			}
			foreach (var item in props)
			{
				item.Product = medicine;
			}

			if (postModel.Id != null)
			{

				_propertyService.DeleteProperty(postModel.Id.Value);

			}

			if (postModel.Id == null)
			{
				_productService.InsertProduct(medicine);
			}
			else
			{
				medicine.Id = postModel.Id.Value;
				_productService.UpdateProduct(medicine);
			}
		}

		private void UpsertProductEntity(PostProductViewModel postModel, bool isAdmin)
		{
			var props = (ICollection<ProductProperty>)_convertProperties(postModel!.Properties!).ToList();

			var product = new Product
			{
				Title = postModel.Title,
				ShortDescription = postModel.ShortDescription,
				CategoryID = postModel.CategoryID,
				ManufacturerID = postModel.ManufacturerID,
				BrandID = postModel.BrandID,
				PathToPhoto = postModel.PathToPhoto,
				Description = postModel.Description,
				Properties = _convertProperties(postModel!.Properties!).ToList(),
				ProductAttributeGroupID = postModel.ProductAttributeGroupID,
			};


			if (postModel.Id != null)
				_propertyService.DeleteProperty(postModel.Id.Value);

			foreach (var item in props)
			{
				item.Product = product;
			}


			if (!isAdmin)
			{
				if (postModel.Id != null)
				{
					return;
				}
				var productConfirm = new ProductConfirm
				{
					PharmacompanyID = postModel.PharmaCompanyID,
					ProductStatusID = _productStatusService.GetProductStatusByName(SD.ProductStatusUnderConsideration).Id,
					CreationDate = DateTime.Now
				};
				product.ProductConfirm = productConfirm;
			}
			if (postModel.Id == null)
			{
				_productService.InsertProduct(product);
			}
			else
			{
				product.Id = postModel.Id.Value;
				_productService.UpdateProduct(product);
			}
		}

		[HttpDelete("{id}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult DeleteProduct(int id)
		{

			_propertyService.DeleteProperty(id);
			_productService.DeleteProduct(id);
			return Ok("Data Deleted");
		}

		[HttpPut("ChangeStatus/{id}/{statusID}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public async Task<IActionResult> ChangeStatus(int id, int statusID, [FromBody] EmailDescriptionViewModel model)
		{
			var product = _productService!.GetProduct(a => a.Id == id, "ProductConfirm,ProductConfirm.PharmaCompany");
			var productConfirm = product!.ProductConfirm;
			if (productConfirm is not null)
			{
				productConfirm!.ProductStatusID = statusID;
				_productConfirmService.UpdateProductConfirm(productConfirm!);
				if (!model.Description.IsNullOrEmpty())
				{
					var user = await _userService.GetUserById(productConfirm.PharmaCompany.UserID);
					var status = _productStatusService.GetProductStatusById(statusID);
					await _emailService.SendChangeProductStatus(
						new Utility.Models.ProductDto { Name = product.Title, Id= product.Id},
						user.Email,
						user.FirstName != null && user.LastName != null ?
						$"{user.FirstName} {user.LastName}" :
						$"Представник {productConfirm.PharmaCompany.Title}",
						model.Description,
						status.Status
						);
					
				}
				return Ok("Data Updated");
			}
			return Ok("Data Not Found");


		}
	}
}
