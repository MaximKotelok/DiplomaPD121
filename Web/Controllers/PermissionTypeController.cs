using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.ActiveSubstanceService;
using Services.CategoryService;
using Services.PermissionTypeService;
using Utility;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PermissionTypeController : Controller
	{
		private readonly IPermissionTypeService _service;

		public PermissionTypeController(IPermissionTypeService service)
		{
			this._service = service;
		}

		[HttpGet("GetAllPermissions")]
		public IActionResult GetAllPermissions()
		{
			var result = _service.GetAllPermissions();
			return Ok(result);
		}


	}
}
