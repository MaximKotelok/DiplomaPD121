using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.PharmacyCompanyService
{
	public interface IPharmaCompanyService
	{
		IEnumerable<PharmaCompany> GetAllPharmaCompanies(Expression<Func<PharmaCompany, bool>>? filter = null, string? includeProperties = null);
		PharmaCompany? GetPharmaCompany(Expression<Func<PharmaCompany, bool>> filter, string? includeProperties = null);
		void InsertPharmaCompany(PharmaCompany company);
		void UpdatePharmaCompany(PharmaCompany company);
		void DeletePharmaCompany(int id);
	}
}
