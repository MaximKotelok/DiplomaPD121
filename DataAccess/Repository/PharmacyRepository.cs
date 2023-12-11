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
    public class PharmacyRepository : Repository<Pharmacy>, IPharmacyRepository
	{
        public PharmacyRepository(ApplicationDbContext db): base(db) { }

        public void Update(Pharmacy pharmacy)
        {
            _db?.Pharmacies?.Update(pharmacy);
        }
    }
}
