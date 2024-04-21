using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.ActiveSubstanceService;
using Services.AttributeGroupService;
using Services.AttributeService;
using Services.BrandService;
using Services.CategoryService;
using Services.ConcreteProductService;
using System.Transactions;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AttributeGroupController : Controller
	{
		private readonly IAttributeGroupService _service;

        public AttributeGroupController(IAttributeGroupService service)
		{
			this._service = service;
        }

		[HttpGet("GetAllAttributeGroups")]
		public IActionResult GetAllGroups()
		{
			var result = _service.GetAllProductAttributeGroups();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

        
        [HttpGet("GetAttributeGroupById")]
        public IActionResult GetAttributeGroupById(int brandId)
        {
            var result = _service.GetProductAttributeGroup(x=> x.Id == brandId);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("GetCountAttributeGroups")]
        public IActionResult GetRecomendedBrands(int count)
        {
            var result = _service.GetAllProductAttributeGroups ().Take(count);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        /* [HttpPost("UpsertAttribute")]
         [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
         public IActionResult UpsertAttribute(PostAttributeViewModel postModel)
         {
             using var transaction = new TransactionScope();
             try
             {
                 UpsertAttributeEntity(postModel);

                 transaction.Complete();
                 return Ok("Data inserted");
             }
             catch (Exception ex)
             {
                 return BadRequest($"Failed to upsert product. Error: {ex.Message}");
             }
         }

         private void UpsertAttributeEntity(PostAttributeViewModel postModel)
         {
             var attribute = new ProductAttribute
             {
                 Name = postModel.Name,
                 Index = postModel.Index,
                 ProductAttributeGroupID = postModel.ProductAttributeGroupID,
             };


             if (postModel.Id == null)
             {
                 _service.InsertAttribute(attribute);
             }
             else
             {
                 attribute.Id = postModel.Id.Value;
                 _service.InsertAttribute(attribute);
             }
         }

         [HttpDelete("DeleteAttribute/{id}")]
         [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
         public IActionResult DeleteAttribute(int id)
         {

             _service.DeleteAttribute(id);

             return Ok("Data Deleted");
         }*/
    }
}
