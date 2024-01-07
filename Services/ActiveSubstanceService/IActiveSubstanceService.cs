using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.ActiveSubstanceService
{
	public interface IActiveSubstanceService
	{
		IEnumerable<ActiveSubstance> GetAllActiveSubstances(Expression<Func<ActiveSubstance, bool>>? filter = null, string? includeProperties = null);
		ActiveSubstance? GetActiveSubstance(Expression<Func<ActiveSubstance, bool>>? filter = null, string? includeProperties = null);		
		void InsertActiveSubstance(ActiveSubstance activeSubstance);
		void UpdateActiveSubstance(ActiveSubstance activeSubstance);
		void DeleteActiveSubstance(int id);
	}
}
