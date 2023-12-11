using DataAccess.Repository.IRepository;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.PharmacyCompanyService
{
	public class PharmaCompanyService : IPharmaCompanyService
	{
		private IRepository<PharmaCompany> _repository;

		public PharmaCompanyService(IRepository<PharmaCompany> repository)
		{
			_repository = repository;
		}

		public void DeletePharmaCompany(int id)
		{
			PharmaCompany? company = _repository.Get(id);
			_repository.Remove(company);
			_repository.SaveChanges();
		}

		public IEnumerable<PharmaCompany> GetAllPharmaCompanies()
		{
			return _repository.GetAll();
		}

		public PharmaCompany? GetPharmaCompany(int? id)
		{
			return _repository.Get(id);
		}

		public void InsertPharmaCompany(PharmaCompany company)
		{
			_repository.Insert(company);
		}

		public void UpdatePharmaCompany(PharmaCompany company)
		{
			_repository.Update(company);
		}
	}
}
