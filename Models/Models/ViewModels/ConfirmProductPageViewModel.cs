using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
	public class ConfirmProductPageViewModel
	{
		public int ProductPerPage { get; set; } = 1;
		public int? Page { get; set; } = null;
	}
}
