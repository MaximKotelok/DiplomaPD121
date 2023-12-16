using DataAccess.Repository.IRepository;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.PharmacyService
{
	public class PharmacyService : IPharmacyService
	{
		private readonly IRepository<Pharmacy> _repository;

		public PharmacyService(IRepository<Pharmacy> repository)
		{
			_repository = repository;
		}

		public void DeletePharmacy(int id)
		{
			Pharmacy? pharmacy = _repository.Get(x => x.Id == id);
			_repository.Remove(pharmacy);
			_repository.SaveChanges();

		}

		public IEnumerable<Pharmacy> GetAllPharmacies(Expression<Func<Pharmacy, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public Pharmacy? GetPharmacy(Expression<Func<Pharmacy, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}


		public void InsertPharmacy(Pharmacy pharmacy)
		{
			_repository.Insert(pharmacy);
		}

		public void UpdatePharmacy(Pharmacy pharmacy)
		{
			_repository.Update(pharmacy);
		}
	}
}
