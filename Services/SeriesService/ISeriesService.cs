using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.SeriesService
{
	public interface ISeriesService
	{
		IEnumerable<Series> GetAllSeries(Expression<Func<Series, bool>>? filter = null, string? includeProperties = null);
		Series? GetSeries(Expression<Func<Series, bool>>? filter = null, string? includeProperties = null);		
		void InsertSeries(Series series);
		void UpdateSeries(Series series);
		void DeleteSeries(int id);
	}
}
