using Domain.Models;
using Domain.Models.ViewModels;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.ProductStatusService
{
	public class ProductStatusService : IProductStatusService
	{
		private readonly IRepository<ProductStatus> _repository;

		public ProductStatusService(IRepository<ProductStatus> repository)
		{
			_repository = repository;
		}



		public IEnumerable<ProductStatus> GetAllStatuses(Expression<Func<ProductStatus, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public ProductStatus GetProductStatusByName(string name)
		{
			return _repository.Get(a => a.Status == name);
		}
	}
}
