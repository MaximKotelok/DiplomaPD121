using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.PharmacyService
{
	public interface IPharmacyService
	{
		IEnumerable<Pharmacy> GetAllPharmacies();
		Pharmacy? GetPharmacy(int? id);
		void InsertPharmacy(Pharmacy pharmacy);
		void UpdatePharmacy(Pharmacy pharmacy);
		void DeletePharmacy(int id);
	}
}
