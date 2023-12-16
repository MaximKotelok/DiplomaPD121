using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.ActiveSubstanceService
{
	public interface IActiveSubstanceService
	{
		IEnumerable<ActiveSubstance> GetAllActiveSubstances();
		ActiveSubstance? GetActiveSubstance(int? id);
		IEnumerator<Medicine>? GetListOfMedicineOfActiveSubstance(int? id);
		IEnumerator<Medicine>? GetListOfMedicineOfActiveSubstance(ActiveSubstance activeSubstance);
		void InsertActiveSubstance(ActiveSubstance category);
		void UpdateActiveSubstance(ActiveSubstance category);
		void DeleteActiveSubstance(int id);
	}
}
