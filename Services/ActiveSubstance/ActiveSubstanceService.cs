using DataAccess.Repository.IRepository;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.ActiveSubstanceService
{
	public class ActiveSubstanceService : IActiveSubstanceService
	{
		private readonly IRepository<ActiveSubstance> _repository;

		public ActiveSubstanceService(IRepository<ActiveSubstance> repository)
		{
			_repository = repository;
		}

		public void DeleteActiveSubstance(int id)
		{
			ActiveSubstance? activeSubstance = _repository.Get(id);
			_repository.Remove(activeSubstance);
			_repository.SaveChanges();
		}
		public ActiveSubstance? GetActiveSubstance(int? id)
		{
			return _repository.Get(id);
		}

		public IEnumerable<ActiveSubstance> GetAllActiveSubstances()
		{
			return _repository.GetAll();
		}

		public IEnumerator<Medicine>? GetListOfMedicineOfActiveSubstance(int? id)
		{
			return _repository.Get(id);
		}

		public IEnumerator<Medicine>? GetListOfMedicineOfActiveSubstance(ActiveSubstance activeSubstance)
		{
			throw new NotImplementedException();
		}

		public void InsertActiveSubstance(ActiveSubstance category)
		{
			throw new NotImplementedException();
		}

		public void InsertCategory(Category category)
		{
			_repository.Insert(category);
		}

		public void UpdateActiveSubstance(ActiveSubstance category)
		{
			throw new NotImplementedException();
		}

		public void UpdateCategory(Category category)
		{
			_repository.Update(category);
		}
	}
}
