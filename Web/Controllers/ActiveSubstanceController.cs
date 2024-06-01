using Domain.Models;
using Domain.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.ActiveSubstanceService;
using Services.CategoryService;
using Services.MedicineService;
using Utility;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActiveSubstanceController : Controller
    {
        private readonly IActiveSubstanceService _service;
        private readonly IMedicineService _medicineService;

        public ActiveSubstanceController(IActiveSubstanceService service, IMedicineService medicineService)
        {
            this._service = service;
            _medicineService = medicineService;
        }
		[HttpPost("GetActiveSubstancesCountOfPage")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult GetActiveSubstancesCountOfPage(PageViewModel model)
        {
			var result = _service.GetAllActiveSubstances().Where(a=> a.Title.Contains(model.Search, StringComparison.OrdinalIgnoreCase));

            return Ok(model.GetCountOfPages(result.Count()));
		}

        [HttpPost("GetAllActiveSubstancesForAdmin")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult GetAllActiveSubstancesForAdmin(PageViewModel model)
        {
            int page = model.Page != null ? model.Page.Value - 1 : 0;
            var result = _service.GetAllActiveSubstances(includeProperties: "Medicines").Where(a => a.Title.Contains(model.Search, StringComparison.OrdinalIgnoreCase))
				.Skip(page*model.ItemsPerPage).Take(model.ItemsPerPage);
            if (result is not null)
            {
                return Ok(result.Select(a => new {
                    Id = a.Id,
                    Title = a.Title,
                    CountOfMedicines = a.Medicines.Count(),
                    IsActive = a.IsActive == null || a.IsActive.Value
                }
                ));
            }
            return BadRequest("No records found");
        }

		[HttpGet("GetAllActiveSubstances")]
		public IActionResult GetAllActiveSubstances()
		{

            var result = _service.GetAllActiveSubstances()
                .Where(a=> a.IsActive == null || a.IsActive.Value);
			if (result is not null)
			{
                return Ok(result);

			}
			return BadRequest("No records found");
		}

		[HttpGet("GetActiveSubstance/{id}")]
        public IActionResult GetActiveSubstance(int id)
        {
            var result = _service.GetActiveSubstance(x => x.Id == id);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }
        [HttpPost("UpdateActiveSubstanceStatus")]
		[Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
		public IActionResult UpdateActiveSubstanceStatus(UpdateIsActiveForActiveSubstanceViewModel model)
        {
            var result = _service.GetActiveSubstance(x => x.Id == model.Id);
            if (result is not null)
            {
                result.IsActive = model.IsActive;
                _service.UpdateActiveSubstance(result);
                return Ok("Success");
            }
            return BadRequest("No records found");
        }

        [HttpPost("AddActiveSubstance")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult AddActiveSubstance(ActiveSubstanceViewModel activeSubstance)
        {
            _service.InsertActiveSubstance(new ActiveSubstance { 
				Title = activeSubstance.Title,
                IsActive = activeSubstance.IsActive
			});
            return Ok("Data inserted");
        }

        [HttpPut("UpdateActiveSubstance")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult UpdateActiveSubstance(ActiveSubstanceViewModel model)
        {
            var activeSubstance = _service.GetActiveSubstance(a => a.Id == model.Id);
            if(activeSubstance is not null)
            {
                activeSubstance.Title = model.Title;
                activeSubstance.IsActive = model.IsActive;
                _service.UpdateActiveSubstance(activeSubstance);
                return Ok("Updation done");
            }
            return BadRequest("Updation failed");
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeleteActiveSubstance(int id)
        {
            _service.DeleteActiveSubstance(id);
            return Ok("Data Deleted");
        }

        [HttpPost("GetListOfMedicineOfActiveSubstance")]
        public IActionResult GetListOfMedicineOfActiveSubstance(GetListOfMedicineOfActiveSubstance model)
        {
            var result = _service.GetActiveSubstance(a => a.Id == model.Id, "Medicines");
            if (result is not null)
            {
                return Ok(result?.Medicines?.Take(model.Count.Value));
            }
            return BadRequest("No records found");
        }
        [HttpGet("getAnalugues/{productId}")]
        public IActionResult GetAnalugues(int productId)
        {
            var product = _medicineService.GetMedicine(p => p.Id == productId);
            if (product is null)
                return BadRequest("No records found");
            var analugues = _service.GetActiveSubstance(s => s.Id == product.ActiveSubstanceID, "Medicines");
            if (analugues is null || analugues.Medicines is null)
                return BadRequest("No records found");
            return Ok(analugues.Medicines.Where(p => p.Id != productId));
        }
    }
}
