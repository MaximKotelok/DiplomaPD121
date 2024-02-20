using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.ReservationService
{
	public class ReservationStatusService : IReservationStatusService
	{
		private readonly IRepository<ReservationStatus> _repository;

		public ReservationStatusService(IRepository<ReservationStatus> repository)
		{
			_repository = repository;
		}

		
		public void DeleteReservationStatus(int id)
		{
            ReservationStatus reservationStatus = _repository.Get(a=>a.Id==id)!;
			_repository.Remove(reservationStatus);
			_repository.SaveChanges();
		}

		public IEnumerable<ReservationStatus> GetAllReservationStatuses(Expression<Func<ReservationStatus, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public ReservationStatus? GetReservationStatus(Expression<Func<ReservationStatus, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}

		public void InsertReservationStatus(ReservationStatus reservationStatus)
		{
			_repository.Insert(reservationStatus);
		}
	
		public void UpdateReservationStatus(ReservationStatus reservationStatus)
		{
			_repository.Update(reservationStatus);
		}
	}
}
