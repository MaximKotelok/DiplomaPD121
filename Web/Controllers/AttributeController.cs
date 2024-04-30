using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.ActiveSubstanceService;
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
	public class AttributeController : Controller
	{
		private readonly IAttributeService _service;

        public AttributeController(IAttributeService service)
		{
			this._service = service;
        }

		[HttpGet("GetAllAttributes")]
		public IActionResult GetAllAttributes()
		{
			var result = _service.GetAllAttributes();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

        [HttpPost("GetAllAttributesForAdmin")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult GetAllAttributesForAdmin(PageViewModel model)
        {
            var rawResult = _service.GetAllAttributes();
            if (!model.Search.IsNullOrEmpty())
            {
                rawResult = rawResult.Where(a =>
                {
                    return
                    a.Id.ToString().StartsWith(model.Search) ||
                    a.Name.StartsWith(model.Search);
                });
            }
            if (rawResult is not null)
            {
                int page = model.Page != null ? model.Page.Value - 1 : 0;
                var result = rawResult.Skip(model.ItemsPerPage * page).Take(model.ItemsPerPage)
                    .Select(a => a);
                int countOfPages = model.GetCountOfPages(rawResult.Count());
                return Ok(new { data = result, countOfPages });
            }
            return BadRequest("No records found");
        }

        [HttpGet("GetCountAttributes")]
        public IActionResult GetRecomendedBrands(int count)
        {
            var result = _service.GetAllAttributes().Take(count);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("GetAttributeById")]
        public IActionResult GetAttributeById(int attributeId)
        {
            var result = _service.GetAttribute(x=> x.Id == attributeId);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpPost("UpsertAttribute")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult UpsertAttribute(PostAttributeViewModel postModel)
        {
            try
            {
                UpsertAttributeEntity(postModel);

                return Ok("Data inserted");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to upsert attribute. Error: {ex.Message}");
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
                _service.UpdateAttribute(attribute);
            }
        }

        [HttpDelete("DeleteAttribute/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeleteAttribute(int id)
        {

            _service.DeleteAttribute(id);

            return Ok("Data Deleted");
        }
    }
}
