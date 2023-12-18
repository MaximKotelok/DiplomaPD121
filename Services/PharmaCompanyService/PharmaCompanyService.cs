using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.PharmacyCompanyService
{
    public class PharmaCompanyService : IPharmaCompanyService
	{
		private readonly IRepository<PharmaCompany> _repository;

		public PharmaCompanyService(IRepository<PharmaCompany> repository)
		{
			_repository = repository;
		}

		public void DeletePharmaCompany(int id)
		{
			PharmaCompany? company = _repository.Get(x => x.Id == id);
			_repository.Remove(company);
			_repository.SaveChanges();
		}

		public IEnumerable<PharmaCompany> GetAllPharmaCompanies(Expression<Func<PharmaCompany, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public PharmaCompany? GetPharmaCompany(Expression<Func<PharmaCompany, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
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
