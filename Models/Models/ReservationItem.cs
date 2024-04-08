using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class ReservationItem : BaseEntity
	{
		public int ConcreteProductID { get; set; }
		[ForeignKey(nameof(ConcreteProductID))]
		public ConcreteProduct? ConcreteProduct { get; set; }
		public int ReservationID { get; set; }
		[ForeignKey(nameof(ReservationID))]
		[JsonIgnore]
		public Reservation? Reservation { get; set; }
		public int Quantity { get; set; }
	}
}
