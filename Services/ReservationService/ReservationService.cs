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
	public class ReservationService : IReservationService
	{
		private readonly IRepository<Reservation> _repository;

		public ReservationService(IRepository<Reservation> repository)
		{
			_repository = repository;
		}

		
		public void DeleteReservation(int id)
		{
			Reservation reservation = _repository.Get(a=>a.Id==id);
			_repository.Remove(reservation);
			_repository.SaveChanges();
		}

		public IEnumerable<Reservation> GetAllReservations(Expression<Func<Reservation, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public Reservation? GetReservation(Expression<Func<Reservation, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}

		public void InsertReservation(Reservation reservation)
		{
			_repository.Insert(reservation);
		}
	
		public void UpdateReservation(Reservation reservation)
		{
			_repository.Update(reservation);
		}
	}
}
