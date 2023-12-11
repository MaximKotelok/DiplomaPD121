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
    public class MedicineRepository : Repository<Medicine>, IMedicineRepository
	{
        public MedicineRepository(ApplicationDbContext db): base(db) { }

        public void Update(Medicine medicine)
        {
            _db?.Medicines?.Update(medicine);
        }
    }
}
