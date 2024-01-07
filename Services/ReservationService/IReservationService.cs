using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.ReservationService
{
	public interface IReservationService
	{
		IEnumerable<Reservation> GetAllReservations(Expression<Func<Reservation, bool>>? filter = null, string? includeProperties = null);
		Reservation? GetReservation(Expression<Func<Reservation, bool>>? filter = null, string? includeProperties = null);		
		void InsertReservation(Reservation reservation);
		void UpdateReservation(Reservation reservation);
		void DeleteReservation(int id);
	}
}
