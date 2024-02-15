using Domain.Models;
using Domain.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.ProductConfirmService
{
	public interface IProductConfirmService
	{
		IEnumerable<ProductConfirm> GetAllProductConfirm(Expression<Func<ProductConfirm, bool>>? filter = null, string? includeProperties = null);
		ProductConfirm? GetProductConfirm(Expression<Func<ProductConfirm, bool>> filter, string? includeProperties = null);
		void InsertProductConfirm(ProductConfirm productConfirm);
		void UpdateProductConfirm(ProductConfirm productConfirm);
		void DeleteProductConfirm(int id);
	}
}
