using DataAccess.Migrations;
using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.AttributeService;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.MedicineService;
using Services.PharmacyCompanyService;
using Services.PropertyService;
using System.Collections.Generic;
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

		public ProductController(
			IProductService productService,
			 IMedicineService medicineService,
			 IAttributeService attributeService,
			 IPropertyService propertyService,
			ICityService cityService,
			IConcreteProductService concreteProductService
			)
		{
			this._productService = productService;
			this._cityService = cityService;
			this._medicineService = medicineService;
			this._attributeService = attributeService;
			this._propertyService = propertyService;
			this._concreteProductService = concreteProductService;
		}



		private IEnumerable<ProductProperty> _convertProperties(List<PropertyViewModel> properties)
		{
			if (!properties.IsNullOrEmpty())
			{

				var names = properties.Select(a => a.Name).ToList();
				IEnumerable<ProductAttribute> productsAttributes = _attributeService
					.GetAllAttributes(a => names.Contains(a.Name));

				if (productsAttributes.Count() != properties.Count())
					throw new Exception();

				return productsAttributes.Select(a => new ProductProperty { Attribute = a, Value = properties.FirstOrDefault(b => b.Name == a.Name).Value });
			}
			return new List<ProductProperty>();


		}


		[HttpGet("{id}")]
		public IActionResult GetProduct(int id)
		{
			Product product;
			ProductViewModel productView = _productService.GetProductViewModel(id);
			if (productView is not null)
			{

				product = _medicineService.GetMedicine(a => a.Id == id, "ActiveSubstance");



				if (product is not null)
				{
					MedicineViewModel res = new MedicineViewModel { Product = productView };
					res.ActiveSubstance = ((Medicine)product).ActiveSubstance.Title;
					res.ActiveSubstanceId = ((Medicine)product).ActiveSubstance.Id;
					return Ok(res);
				}

				return Ok(productView);
			}


			return BadRequest("No records found");
		}

		[HttpGet("GetAll")]
		public IActionResult GetAll()
		{
			var result = _productService
				.GetAllProducts(includeProperties: "Manufacturer");
			if (result is not null)
			{				
				return Ok(result);
			}
			return BadRequest("No records found");
		}




		[HttpGet("")]
		public IActionResult GetProductOffer(int count)
		{
			var result = _productService
				.GetAllProducts(includeProperties: "Manufacturer").TakeLast(count);
			if (result is not null)
			{
				var products =
					result.Select(a =>
					new HomeProductViewModel
					{
						Id = a.Id,
						Manufacturer = a.Manufacturer.Name,
						Title = a.Title,
						ShortDescription = a.ShortDescription,
						PathToPhoto=a.PathToPhoto
					}
					);
				return Ok(products);
			}
			return BadRequest("No records found");
		}


		[HttpPost("/GetAllProductsFromIdArray")]
		public IActionResult GetAllProductsFromIdArray(int[] idArray)
		{
			if (idArray.IsNullOrEmpty())
				return Ok("idArray is empty");


			var result = _productService
				.GetAllProducts(a => idArray.Contains(a.Id))
				.OrderBy(a => Array.IndexOf(idArray, a.Id));
			if (result is not null)
			{
				return Ok(result);
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
					a.Pharmacy.CityID == city.Id, "Pharmacy");

				return Ok(result);
			}
			return BadRequest("No records found");
		}


		[HttpPost("AddMedicine")]
		public IActionResult AddMedicine(MedicineViewModel medicineViewModel)
		{
			var props = _convertProperties(medicineViewModel.Product.Properties);


			Medicine medicine = new Medicine
			{
				Title = medicineViewModel.Product.Title,
				CategoryID = medicineViewModel.Product.CategoryID,
				PathToPhoto = medicineViewModel.Product.PathToPhoto,
				Description = medicineViewModel.Product.Description,
				ActiveSubstanceID = medicineViewModel.ActiveSubstanceId
			};

			_medicineService.InsertMedicine(medicine);


			foreach (var item in props)
			{
				item.Product = medicine;
				_propertyService.InsertProperty(item);
			}

			return Ok("Data inserted");
		}


		[HttpPut("UpdateMedicine")]
		public IActionResult UpdateMedicine(MedicineViewModel medicineViewModel)
		{
			var props = _convertProperties(medicineViewModel.Product.Properties);
			_propertyService.DeleteProperty(medicineViewModel.Product.Id.Value);

			Medicine medicine = new Medicine
			{
				Id = medicineViewModel.Product.Id.Value,
				Title = medicineViewModel.Product.Title,
				CategoryID = medicineViewModel.Product.CategoryID,
				PathToPhoto = medicineViewModel.Product.PathToPhoto,
				Description = medicineViewModel.Product.Description,
				ActiveSubstanceID = medicineViewModel.ActiveSubstanceId
			};

			_medicineService.UpdateMedicine(medicine);


			foreach (var item in props)
			{
				item.Product = medicine;
				_propertyService.InsertProperty(item);
			}

			return Ok("Data updated");
		}

		[HttpPut("{id}")]

		public IActionResult UpdateProduct(int id, Product product)
		{
			product.Id = id;
			_productService.UpdateProduct(product);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]

		public IActionResult DeleteProduct(int id)
		{

			_propertyService.DeleteProperty(id);
			_productService.DeleteProduct(id);
			return Ok("Data Deleted");
		}
	}
}
