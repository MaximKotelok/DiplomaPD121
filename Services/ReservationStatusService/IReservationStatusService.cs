using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.ReservationService
{
	public interface IReservationStatusService
	{
		IEnumerable<ReservationStatus> GetAllReservationStatuses(Expression<Func<ReservationStatus, bool>>? filter = null, string? includeProperties = null);
        ReservationStatus? GetReservationStatus(Expression<Func<ReservationStatus, bool>>? filter = null, string? includeProperties = null);		
		void InsertReservationStatus(ReservationStatus reservationStatus);
		void UpdateReservationStatus(ReservationStatus reservationStatus);
		void DeleteReservationStatus(int id);
	}
}
