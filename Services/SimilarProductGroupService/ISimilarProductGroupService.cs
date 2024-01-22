using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.SimilarProductGroupService
{
	public interface ISimilarProductGroupService
    {
		IEnumerable<SimilarProductGroup> GetAllSimilarProductGroups(Expression<Func<SimilarProductGroup, bool>>? filter = null, string? includeProperties = null);
		SimilarProductGroup? GetSimilarProductGroup(Expression<Func<SimilarProductGroup, bool>> filter, string? includeProperties = null);
		void InsertSimilarProductGroup(SimilarProductGroup similarProductGroup);
		void UpdateSimilarProductGroup(SimilarProductGroup similarProductGroup);
		void DeleteSimilarProductGroup(int groupId);
	}
}
