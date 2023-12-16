using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.PharmacyService
{
	public interface IPharmacyService
	{
		IEnumerable<Pharmacy> GetAllPharmacies(Expression<Func<Pharmacy, bool>>? filter = null, string? includeProperties = null);
		Pharmacy? GetPharmacy(Expression<Func<Pharmacy, bool>> filter, string? includeProperties = null);
		void InsertPharmacy(Pharmacy pharmacy);
		void UpdatePharmacy(Pharmacy pharmacy);
		void DeletePharmacy(int id);
	}
}
