using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class GetListOfMedicineOfActiveSubstance
	{
		public int? Id { get; set; }
		public int? Count { get; set; }
		
	}
}
