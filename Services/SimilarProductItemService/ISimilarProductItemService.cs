using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.SimilarProductItemService
{
	public interface ISimilarProductItemService
	{
		IEnumerable<SimilarProductItem> GetAllSimilarSimilarProductItems(Expression<Func<SimilarProductItem, bool>>? filter = null, string? includeProperties = null);
		SimilarProductItem? GetSimilarProductItem(Expression<Func<SimilarProductItem, bool>> filter, string? includeProperties = null);
		void InsertSimilarProductItem(SimilarProductItem similarProductItem);
		void UpdateSimilarProductItem(SimilarProductItem similarProductItem);
		void DeleteSimilarProductItem(int itemId);
	}
}
