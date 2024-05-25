using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.CalculateActionModels
{
	public class ProductConfirmAdminCalculateModel
	{
		public ProductConfirm? ProductConfirm { get; set; }
		public PharmaCompany? PharmaCompany { get; set; }
		public bool? IsTmp { get; set; }	
	}
}
