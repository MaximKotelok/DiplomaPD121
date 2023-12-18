﻿using DataAccess.Repository.IRepository;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
			ActiveSubstance? activeSubstance = _repository.Get(a=>a.Id == id);
			_repository.Remove(activeSubstance);
			_repository.SaveChanges();
		}
		public ActiveSubstance? GetActiveSubstance(Expression<Func<ActiveSubstance, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}

		public IEnumerable<ActiveSubstance> GetAllActiveSubstances(Expression<Func<ActiveSubstance, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public IEnumerable<Medicine>? GetListOfMedicineOfActiveSubstance(int id)
		{
			var res = _repository.Get(a => a.Id == id, "Medicines");
			if(res is not null)
				return res?.Medicines;
			return new List<Medicine>();
		}

		public IEnumerable<Medicine>? GetListOfMedicineOfActiveSubstance(ActiveSubstance activeSubstance)
		{
			return GetListOfMedicineOfActiveSubstance(activeSubstance.Id);
		}

		public void InsertActiveSubstance(ActiveSubstance activeSubstance)
		{
			_repository.Insert(activeSubstance);
		}

		public void UpdateActiveSubstance(ActiveSubstance category)
		{
			_repository.Update(category);
		}
		
	}
}
