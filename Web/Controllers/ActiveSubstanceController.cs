using Domain.Models;
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

        [HttpGet("")]
        public IActionResult GetAllIActiveSubstances()
        {
            var result = _service.GetAllActiveSubstances();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpGet("{id}")]
        public IActionResult GetActiveSubstance(int id)
        {
            var result = _service.GetActiveSubstance(x => x.Id == id);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult AddActiveSubstance(ActiveSubstance activeSubstance)
        {
            _service.InsertActiveSubstance(activeSubstance);
            return Ok("Data inserted");
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult UpdateActiveSubstance(int id, ActiveSubstance activeSubstance)
        {
            activeSubstance.Id = id;
            _service.UpdateActiveSubstance(activeSubstance);
            return Ok("Updation done");
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = SD.Role_Admin)]
        public IActionResult DeleteActiveSubstance(int id)
        {
            _service.DeleteActiveSubstance(id);
            return Ok("Data Deleted");
        }

        [HttpGet("GetListOfMedicineOfActiveSubstance/{id}")]
        public IActionResult GetListOfMedicineOfActiveSubstance(int id)
        {
            var result = _service.GetActiveSubstance(a => a.Id == id, "Medicines");
            if (result is not null)
            {
                return Ok(result?.Medicines);
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
