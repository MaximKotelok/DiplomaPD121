using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository.IRepository
{
	public interface IPharmacyRepository : IRepository<Pharmacy>
	{
		void Update(Pharmacy obj);
	}
}
