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
		public ICollection<ReservationItem>? ReservationItems { get; set; }
		public DateTime ToGetReservationTime { get; set; }
		public DateTime ReservedTime { get; set; }
		
		[Required]
        public string? Email { get; set; }
        public string? Phone { get; set; }	
		
		public string? UserID { get; set; }
		[ForeignKey(nameof(UserID))]
		public User? User { get; set; }
		public int StatusID { get; set; }
		public int PharmacyID { get; set; }
		[ForeignKey(nameof(PharmacyID))]
		public Pharmacy? Pharmacy { get; set; }
		[ForeignKey(nameof(StatusID))]
		public ReservationStatus? Status { get; set; }
	}
}
