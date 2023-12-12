using DataAccess.Repository.IRepository;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.MedicineService
{
	public class MedicineService : IMedicineService
	{
		private IRepository<Medicine> _repository;

		public MedicineService(IRepository<Medicine> repository)
		{
			_repository = repository;
		}

		public void DeleteMedicine(int id)
		{
			Medicine? medicine = _repository.Get(id);
			_repository.Remove(medicine);
			_repository.SaveChanges();
		}

		public IEnumerable<Medicine> GetAllMedicines()
		{
			return _repository.GetAll();
		}

		public Medicine? GetMedicine(int? id)
		{
			return _repository.Get(id);
		}

		public void InsertMedicine(Medicine pharmacy)
		{
			_repository.Insert(pharmacy);
		}

		public void UpdateMedicine(Medicine pharmacy)
		{
			_repository.Update(pharmacy);
		}

	}
}
