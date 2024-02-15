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
		[ForeignKey(nameof(ConcreteProductID))]
		public ConcreteProduct? ConcreteProduct { get; set; }
		public DateTime ToGetReservationTime { get; set; }
		public DateTime ReservedTime { get; set; }
		
		[Required]
        public string? Email { get; set; }
        [Required]
        public string? Phone { get; set; }	
		
		public string? UserID { get; set; }
		[ForeignKey(nameof(UserID))]
		public User? User { get; set; }
		public int StatusID { get; set; }
		[ForeignKey(nameof(StatusID))]
		public ReservationStatus? Status { get; set; }
	}
}
