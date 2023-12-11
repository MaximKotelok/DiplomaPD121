using DataAccess.Data;
using DataAccess.Repository.IRepository;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class PharmaCompanyRepository : Repository<PharmaCompany>, IPharmaCompanyRepository
	{
        public PharmaCompanyRepository(ApplicationDbContext db): base(db) { }

        public void Update(PharmaCompany pharmaCompany)
        {
            _db?.PharmaCompanies?.Update(pharmaCompany);
        }
    }
}
