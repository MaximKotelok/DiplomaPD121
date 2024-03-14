using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
	public class MedicineViewModel
	{
		public ProductViewModel? Product { get; set; }
		public string? ActiveSubstance { get; set; }
		public int ActiveSubstanceID { get; set; }
		public PermissionIdWithDescription[]? MedicineTable { get; set; }
	}
}
