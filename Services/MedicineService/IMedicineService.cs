using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.MedicineService
{
	public interface IMedicineService
	{
		IEnumerable<Medicine> GetAllMedicines();
		Medicine? GetMedicine(int? id);
		void InsertMedicine(Medicine pharmacy);
		void UpdateMedicine(Medicine pharmacy);
		void DeleteMedicine(int id);
	}
}
