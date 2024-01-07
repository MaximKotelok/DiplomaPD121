using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class Reservation:BaseEntity
	{
		public int ConcreteProductID { get; set; }
		[ForeignKey("ConcreteProductID")]
		public ConcreteProduct? ConcreteProduct { get; set; }
		public DateTime ToGetReservationTime { get; set; }
		public DateTime ReservedTime { get; set; }
		[Required]
		public string? UserID { get; set; }
		[ForeignKey("UserID")]
		public User? User { get; set; }
		public int StatusId { get; set; }
		[ForeignKey("StatusId")]
		public ReservationStatus? Status { get; set; }
	}
}
