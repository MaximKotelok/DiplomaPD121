using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.SeriesService
{
	public class SeriesService : ISeriesService
    {
		private readonly IRepository<Series> _repository;

		public SeriesService(IRepository<Series> repository)
		{
			_repository = repository;
		}
		
		public void DeleteSeries(int id)
		{
			Series series = _repository.Get(a => a.Id == id)!;
			_repository.Remove(series);
			_repository.SaveChanges();				
		}
		public IEnumerable<Series> GetAllSeries(Expression<Func<Series, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public Series? GetSeries(Expression<Func<Series, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}
		

		public void InsertSeries(Series series)
		{
			_repository.Insert(series);
		}

		public void UpdateSeries(Series series)
		{
			_repository.Update(series);
		}
	}
}
