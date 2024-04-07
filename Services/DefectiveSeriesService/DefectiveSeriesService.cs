using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.DefectiveSeriesService
{
    public class DefectiveSeriesService : IDefectiveSeriesService
    {
        private readonly IRepository<DefectiveSeries> _repository;

        public DefectiveSeriesService(IRepository<DefectiveSeries> repository)
        {
            _repository = repository;
        }

        public void DeleteDefectiveSeries(int id)
        {
            DefectiveSeries? defectiveSeries = _repository.Get(x => x.Id == id);
            _repository.Remove(defectiveSeries);
            _repository.SaveChanges();
        }

        public IEnumerable<DefectiveSeries> GetDefectiveSeries(Expression<Func<DefectiveSeries, bool>>? filter = null, string? includeProperties = null)
        {
            return _repository.GetAll(filter, includeProperties);
        }

        public DefectiveSeries? GetOneDefectiveSeries(Expression<Func<DefectiveSeries, bool>> filter, string? includeProperties = null)
        {
            return _repository.Get(filter, includeProperties);
        }

        public void InsertDefectiveSeries(DefectiveSeries defectiveSeries)
        {
            _repository.Insert(defectiveSeries);
            _repository.SaveChanges();
        }

        public void UpdateDefectiveSeries(DefectiveSeries defectiveSeries)
        {
            _repository.Update(defectiveSeries);
            _repository.SaveChanges();
        }
    }

}
