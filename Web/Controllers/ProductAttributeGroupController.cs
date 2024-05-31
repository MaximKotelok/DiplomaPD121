using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.AttributeGroupService;
using Services.AttributeService;
using Services.CategoryService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;
using System.Linq;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductAttributeGroupController : ControllerBase
	{
		private readonly IAttributeGroupService _service;
		private readonly IAttributeService _attributeService;
		
		public ProductAttributeGroupController(IAttributeGroupService service,
			IAttributeService attributeService) {
			this._service = service;		
			this._attributeService = attributeService;		
		}

		[HttpGet("GetGroupsForProductAdd")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = $"{SD.Role_PharmaCompany},{SD.Role_Admin}")]
		public IActionResult GetGroupsForProductAdd()
		{
			var result = _service.GetAllProductAttributeGroups();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = $"{SD.Role_Admin},{SD.Role_PharmaCompany}")]
		public IActionResult GetAllGroups()
		{
			var result = _service.GetAllProductAttributeGroups();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("get")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = $"{SD.Role_Admin},{SD.Role_PharmaCompany}")]
		public IActionResult GetGroupById(int id)
		{
			var result = _service.GetProductAttributeGroup(
				a => a.Id == id,
				includeProperties: "ExistAttributes,AttributesInGroup") ;
			if (result is not null)
			{
				if (result.IsShowAll == true)
				{
					result.AttributesInGroup = _attributeService.GetAllAttributes();
				}
				else
				{
					var general = _service.GetProductAttributeGroup(a => a.IsShowAll == true, "AttributesInGroup");
					if(general is not null && !general.AttributesInGroup.IsNullOrEmpty())
					{
						result.AttributesInGroup = result.AttributesInGroup.Concat(general.AttributesInGroup);
					}
				}
				return Ok(result);
			}
			return BadRequest("No records found");
		}
	}
}
