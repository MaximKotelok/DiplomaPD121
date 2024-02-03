using Domain.Models;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.PermissionTypeService
{
    public class PermissionTypeService : IPermissionTypeService
	{
		private IRepository<PermissionType> _repository;

		public PermissionTypeService(IRepository<PermissionType> repository)
		{
			_repository = repository;
		}

		public IEnumerable<PermissionType> GetAllPermissions(Expression<Func<PermissionType, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

	}
}
