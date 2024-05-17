using Domain.Models;
using Domain.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductStatusService
{
	public interface IProductStatusService
	{
		IEnumerable<ProductStatus> GetAllStatuses(Expression<Func<ProductStatus, bool>>? filter = null, string? includeProperties = null);
		ProductStatus GetProductStatusByName(string name);
		ProductStatus GetProductStatusById(int id);
		
	}
}
