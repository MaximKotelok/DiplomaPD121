using DataAccess.Migrations;
using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.AttributeGroupService;
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
	public class ProductAttributeController : ControllerBase
	{
		private readonly IAttributeService _attributeService;
		private readonly IAttributeGroupService _attributeGroupService;
		
		public ProductAttributeController(
			 IAttributeService attributeService,
			 IAttributeGroupService attributeGroupService
			)
		{
			this._attributeService = attributeService;
			this._attributeGroupService = attributeGroupService;
		}
		

		[HttpGet("/all")]
		public IActionResult GetAllGroups()
		{
			var groups = _attributeGroupService.GetAllProductAttributeGroups(includeProperties: "AttributesInGroup");

			if (groups is not null)
			{
				return Ok(groups);
			}
			return BadRequest("No records found");
		}


		[HttpGet("/getByName/{name}")]
		public IActionResult GetAllProducts(string name)
		{
			var result = _attributeGroupService
				.GetProductAttributeGroup(
					a=>a.Name == name, 
					includeProperties: "AttributesInGroup"
					);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("/getById/{id}")]
		public IActionResult GetAllProducts(int id)
		{
			var result = _attributeGroupService
				.GetProductAttributeGroup(
					a => a.Id == id,
					includeProperties: "AttributesInGroup"
					);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}


	}
}
