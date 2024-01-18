using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.MedicineService
{
    public class MedicineService //: IMedicineService
	{
		/*private IRepository<Medicine> _repository;

		public MedicineService(IRepository<Medicine> repository)
		{
			_repository = repository;
		}

		public void DeleteMedicine(int id)
		{
			Medicine? medicine = _repository.Get(x => x.Id == id);
			_repository.Remove(medicine);
			_repository.SaveChanges();
		}

		public IEnumerable<Medicine> GetAllMedicines(Expression<Func<Medicine, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public Medicine? GetMedicine(Expression<Func<Medicine, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}

		public void InsertMedicine(Medicine pharmacy)
		{
			_repository.Insert(pharmacy);
		}

		public void UpdateMedicine(Medicine pharmacy)
		{
			_repository.Update(pharmacy);
		}
*/
	}
}
