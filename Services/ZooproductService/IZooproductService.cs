using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.ZooproductService
{
	public interface IZooproductService
	{
		IEnumerable<Zooproduct> GetAllZooproducts(Expression<Func<Zooproduct, bool>>? filter = null, string? includeProperties = null);
		Zooproduct? GetZooproduct(Expression<Func<Zooproduct, bool>> filter, string? includeProperties = null);
		void InsertZooproduct(Zooproduct pharmacy);
		void UpdateZooproduct(Zooproduct pharmacy);
		void DeleteZooproduct(int id);
	}
}
