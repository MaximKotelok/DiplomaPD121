using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.MedicineService
{
	public interface IMedicineService
	{
		IEnumerable<Medicine> GetAllMedicines(Expression<Func<Medicine, bool>>? filter = null, string? includeProperties = null);
		Medicine? GetMedicine(Expression<Func<Medicine, bool>	> filter, string? includeProperties = null);
		void InsertMedicine(Medicine pharmacy);
		void UpdateMedicine(Medicine pharmacy);
		void DeleteMedicine(int id);
	}
}
