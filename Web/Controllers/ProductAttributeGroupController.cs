using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.AttributeGroupService;
using Services.CategoryService;
using Services.ConcreteProductService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductAttributeGroupController : ControllerBase
	{
		private readonly IAttributeGroupService _service;
		

		public ProductAttributeGroupController(IAttributeGroupService service) {
			this._service = service;		
		}

		[HttpGet("GetGroupsForProductAdd")]
		//[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult GetGroupsForProductAdd()
		{
			var result = _service.GetAllProductAttributeGroups(a=> 
			(a.IsDisableShow == null || !a.IsDisableShow.Value));
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("")]
		//[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
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
		//[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult GetGroupById(int id)
		{
			var result = _service.GetProductAttributeGroup(
				a => a.Id == id,
				includeProperties: "ExistAttributes,AttributesInGroup") ;
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}



	}
}
