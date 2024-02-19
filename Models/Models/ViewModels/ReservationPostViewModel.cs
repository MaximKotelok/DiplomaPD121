using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
	public class ReservationPostViewModel
	{		
		public IEnumerable<int>? ConcreteProducts { get; set; }	
		public string? Phone { get; set; }
		public string? Email { get; set; }

	}
}
