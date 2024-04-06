using Domain.Models;
using Repository.Repository.Interfaces;
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
            using (var transaction = _repository.BeginTransaction())
            {
                try
                {
                    Pharmacy? pharmacy = _repository.Get(x => x.Id == id);
                    _repository.Remove(pharmacy);
                    _repository.SaveChanges();

                    // Если все операции завершены успешно, фиксируем транзакцию
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    // В случае ошибки откатываем транзакцию
                    transaction.Rollback();
                    throw new Exception("Failed to delete pharmacy. Transaction rolled back.", ex);
                }
            }
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
