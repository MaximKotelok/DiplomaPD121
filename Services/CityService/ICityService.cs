using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.CityService
{
    public interface ICityService
    {
        IEnumerable<City> GetAllCitys(Expression<Func<City, bool>>? filter = null, string? includeProperties = null);
        City? GetCity(Expression<Func<City, bool>> filter, string? includeProperties = null);

        void InsertCity(City city);
        void UpdateCity(City city);
        void DeleteCity(int id);

    }
}
