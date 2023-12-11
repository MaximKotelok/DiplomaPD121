using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.PharmacyCompanyService
{
	public interface IPharmaCompanyService
	{
		IEnumerable<PharmaCompany> GetAllPharmaCompanies();
		PharmaCompany? GetPharmaCompany(int? id);
		void InsertPharmaCompany(PharmaCompany company);
		void UpdatePharmaCompany(PharmaCompany company);
		void DeletePharmaCompany(int id);
	}
}
