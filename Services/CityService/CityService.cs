using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.CityService
{
    public class CityService : ICityService
    {

        private readonly IRepository<City> _repository;

        public CityService(IRepository<City> repository)
        {
            _repository = repository;
        }

        public void DeleteCity(int id)
        {
            City? city = _repository.Get(x => x.Id == id);
            _repository.Remove(city);
            _repository.SaveChanges();
        }

        public IEnumerable<City> GetAllCitys(Expression<Func<City, bool>>? filter = null, string? includeProperties = null)
        {
            return _repository.GetAll(filter, includeProperties);
        }

        public City? GetCity(Expression<Func<City, bool>> filter, string? includeProperties = null)
        {
			return _repository.Get(filter, includeProperties);
        }


        public void InsertCity(City city)
        {
            _repository.Insert(city);

        }

        public void UpdateCity(City city)
        {
            _repository.Update(city);
        }
    }
}
