using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.PermissionTypeService
{
	public interface IPermissionTypeService
	{
		IEnumerable<PermissionType> GetAllPermissions(Expression<Func<PermissionType, bool>>? filter = null, string? includeProperties = null);
	}
}
