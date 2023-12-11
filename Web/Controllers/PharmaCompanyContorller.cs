using DataAccess.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PharmaCompanyContorller : ControllerBase
	{
		private UnitOfWork unitOfWork;

		public PharmaCompanyContorller(UnitOfWork unitOfWork) {
			this.unitOfWork = unitOfWork;
		}

		[HttpGet]
		public IActionResult GetPharmaCompany(int id)
		{
			return Ok(unitOfWork.PharmaCompany.Get(x => x.PharmaCompanyID == id));
		}
	}
}
