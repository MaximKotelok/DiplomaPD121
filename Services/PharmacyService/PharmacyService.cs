using DataAccess.Repository.IRepository;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
			Pharmacy? pharmacy = _repository.Get(id);
			_repository.Remove(pharmacy);
			_repository.SaveChanges();

		}

		public IEnumerable<Pharmacy> GetAllPharmacies()
		{
			return _repository.GetAll();
		}

		public Pharmacy? GetPharmacy(int? id)
		{
			return _repository.Get(id);
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
