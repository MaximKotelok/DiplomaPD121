﻿using DataAccess.Migrations;
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
using Services.ProductConfirmService;
using Services.ProductStatusService;
using Services.PropertyService;
using Services.ReservationService;
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

		public ProductController(
				IProductService productService,
				IAttributeService attributeService,
				IPropertyService propertyService,
				ICityService cityService,
				IConcreteProductService concreteProductService,
				IMedicineService medicineService,
				IProductStatusService productStatusService,
				IProductConfirmService productConfirmService,
				IReservationService reservationService
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

		[HttpGet("GetTopOffers")]
		public IActionResult GetTopOffers(int count)
		{
			var result = _productService
				.GetAllProducts(includeProperties: "Manufacturer,ProductConfirm,ProductConfirm.ProductStatus,Category")
				.Where(a => (a.ProductConfirm == null || a!.ProductConfirm!.ProductStatus!.Status!.Equals(SD.ProductStatusConfirmed)))
				.GroupBy(a => a.Category.Title)
				.TakeLast(3).Select(a => new
				{
					title = a.Key,
					data = a
				.Select(b => new HomeProductViewModel
				{
					Id = b.Id,
					Manufacturer = b.Manufacturer!.Name,
					Title = b.Title,
					ShortDescription = b.ShortDescription,
					PathToPhoto = b.PathToPhoto
				}).Take(count)
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

		[HttpPost("UpsertProduct")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
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
			var productConfirm = new ProductConfirm
			{
				PharmacompanyID = postModel.PharmaCompanyID,
				ProductStatusID = _productStatusService.GetProductStatusByName(SD.ProductStatusUnderConsideration).Id,
				CreationDate = DateTime.Now
			};
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
				ProductConfirm = productConfirm

			};

			foreach (var item in props)
			{
				if (postModel.Id != null)
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
				productConfirm.ProductID = postModel.Id.Value;
				_productConfirmService.UpdateProductConfirm(productConfirm);
			}
		}

		private void UpsertProductEntity(PostProductViewModel postModel)
		{
			var props = (ICollection<ProductProperty>)_convertProperties(postModel!.Properties!).ToList();
			var productConfirm = new ProductConfirm
			{
				PharmacompanyID = postModel.PharmaCompanyID,
				ProductStatusID = _productStatusService.GetProductStatusByName(SD.ProductStatusUnderConsideration).Id,
				CreationDate = DateTime.Now
			};
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
				ProductConfirm = productConfirm
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
				productConfirm.ProductID = postModel.Id.Value;
				_productConfirmService.UpdateProductConfirm(productConfirm);
			}
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteProduct(int id)
		{

			_propertyService.DeleteProperty(id);
			_productService.DeleteProduct(id);
			return Ok("Data Deleted");
		}

		[HttpPut("ChangeStatus/{id}/{statusID}")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult ChangeStatus(int id, int statusID)
		{
			var productConfirm = _productService!
				.GetProduct(a => a.Id == id, "ProductConfirm")
				!.ProductConfirm;
			if (productConfirm is not null)
			{
				productConfirm!.ProductStatusID = statusID;
				_productConfirmService.UpdateProductConfirm(productConfirm!);
				return Ok("Data Updated");
			}
			return Ok("Data Not Found");


		}
	}
}
