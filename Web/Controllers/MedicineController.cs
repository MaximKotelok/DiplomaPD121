using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.CategoryService;
using Services.ConcreteProductService;
using Services.MedicineService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;

namespace Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MedicineController : ControllerBase
	{
		private readonly IMedicineService _service;

		public MedicineController(IMedicineService service) {
			this._service = service;
		}

		[HttpGet("")]
		public IActionResult GetAllMedicines()
		{
			var result = _service.GetAllMedicines();
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpGet("{id}")]
		public IActionResult GetMedicine(int id)
		{
			var result = _service.GetMedicine(x => x.Id == id);
			if (result is not null)
			{
				return Ok(result);
			}
			return BadRequest("No records found");
		}

		[HttpPost]
		public IActionResult AddMedicine(Medicine medicine)
		{
			_service.InsertMedicine(medicine);
			return Ok("Data inserted");
		}

		[HttpPut("{id}")]
		public IActionResult UpdateMedicine(int id, Medicine medicine)
		{
			medicine.Id = id;
			_service.UpdateMedicine(medicine);
			return Ok("Updation done");
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteMedicine(int id)
		{			
			_service.DeleteMedicine(id);
			return Ok("Data Deleted");
		}
	}
}
