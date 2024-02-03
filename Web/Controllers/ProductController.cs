using DataAccess.Migrations;
using Domain.Models;
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
using Services.MedicineService;
using Services.PharmacyCompanyService;
using Services.PropertyService;
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

		public ProductController(
			IProductService productService,
			 IAttributeService attributeService,
			 IPropertyService propertyService,
			ICityService cityService,
			IConcreteProductService concreteProductService,
			IMedicineService medicineService
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

				var names = properties.Select(a => a.Id).ToList();
				IEnumerable<ProductAttribute> productsAttributes = _attributeService
					.GetAllAttributes(a => names.Contains(a.Id));

				if (productsAttributes.Count() != properties.Count())
					throw new Exception();

				return productsAttributes.Select(a => new ProductProperty { Attribute = a, Value = properties!.FirstOrDefault(b => b.Id == a.Id)!.Value });
			}
			return new List<ProductProperty>();


		}


		[HttpGet("GetById")]
		public IActionResult GetProduct(int id)
		{
			Product product = _productService!.GetProduct(a => a.Id == id, includeProperties: "Properties,Properties,Properties.Attribute")!;

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
					BrandId = product.BrandId,
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


		[HttpPost("GetAllProductsFromIdArray")]
		public IActionResult GetAllProductsFromIdArray(IEnumerable<int> ids)
		{
			int[] idArray = ids.ToArray();
			if (idArray.IsNullOrEmpty())
				return Ok("idArray is empty");


			var result = _productService
				.GetAllProducts(a => idArray.Contains(a.Id), includeProperties: "Manufacturer")
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

		[HttpPost("UpsertProduct")]
		public IActionResult UpsertProduct(PostProductViewModel postModel)
		{
			using var transaction = new TransactionScope();
			try
			{
				if (postModel.ActiveSubstanceID is not null)
					UpsertMedicine(postModel);
				else
					UpsertProductEntity(postModel);

				transaction.Complete();
				return Ok("Data inserted");
			}
			catch (Exception ex)
			{
				return BadRequest($"Failed to upsert product. Error: {ex.Message}");
			}
		}

		private void UpsertMedicine(PostProductViewModel postModel)
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
				BrandId = postModel.BrandId,
				ActiveSubstanceID = postModel.ActiveSubstanceID.Value,
				Properties = _convertProperties(postModel!.Properties!).ToList(),
				ProductAttributeGroupID = postModel.ProductAttributeGroupID,
				AdultsId = postModel.AdultsId,
				AllergiesId = postModel.AllergiesId,
				ChildrenId = postModel.ChildrenId,
				DiabeticsId = postModel.DiabeticsId,
				DriversId = postModel.DriversId,
				NursingMothersId = postModel.NursingMothersId,
				PregnantId = postModel.PregnantId			

			};

			foreach (var item in props)
			{
				if (postModel.Id != null)
					_propertyService.DeleteProperty(postModel.Id.Value);
				item.Product = medicine;
			}
			if (postModel.Id == null)
			{
				_medicineService.InsertMedicine(medicine);
			}
			else
			{
				medicine.Id = postModel.Id.Value;
				_medicineService.UpdateMedicine(medicine);
			}
		}

		private void UpsertProductEntity(PostProductViewModel postModel)
		{
			var props = (ICollection<ProductProperty>)_convertProperties(postModel!.Properties!).ToList();

			var product = new Product
			{
				Title = postModel.Title,
				ShortDescription = postModel.ShortDescription,
				CategoryID = postModel.CategoryID,
				ManufacturerID = postModel.ManufacturerID,
				BrandId = postModel.BrandId,
				PathToPhoto = postModel.PathToPhoto,
				Description = postModel.Description,
				Properties = _convertProperties(postModel!.Properties!).ToList(),
				ProductAttributeGroupID = postModel.ProductAttributeGroupID
			};

			foreach (var item in props)
			{
				if (postModel.Id != null)
					_propertyService.DeleteProperty(postModel.Id.Value);
				item.Product = product;
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
