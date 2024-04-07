using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.DefectiveSeriesService
{
    public interface IDefectiveSeriesService
    {
        IEnumerable<DefectiveSeries> GetDefectiveSeries(Expression<Func<DefectiveSeries, bool>>? filter = null, string? includeProperties = null);
        DefectiveSeries? GetOneDefectiveSeries(Expression<Func<DefectiveSeries, bool>> filter, string? includeProperties = null);

        void InsertDefectiveSeries(DefectiveSeries defectiveSeries);
        void UpdateDefectiveSeries(DefectiveSeries defectiveSeries);
        void DeleteDefectiveSeries(int id);
    }
}
