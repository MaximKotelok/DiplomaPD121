using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
	public class PageViewModel
	{
		public int ItemsPerPage { get; set; } = 1;
		public int? Page { get; set; } = null;
	
		public int GetCountOfPages(int count)
		{
			return (int)Math.Round(Convert.ToDouble(count) / Convert.ToDouble(this.ItemsPerPage));			
		}
	}
}
