using DataAccess.Data;
using DataAccess.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _db;
        public ICategoryRepository? Category { get; private set; }
        public IProductRepository? Product { get; private set; }
		public IConcreteProductRepository? ConcreteProduct { get; private set; }
		public IMedicineRepository? Medicine { get; private set; }
		public IPharmaCompanyRepository? PharmaCompany { get; private set; }
		public IPharmacyRepository? Pharmacy { get; private set; }		

		public UnitOfWork(ApplicationDbContext db)
        {
            this._db = db;
            Category = new CategoryRepository(db);
            Product = new ProductRepository(db);
			ConcreteProduct = new ConcreteProductRepository(db);
			Medicine = new MedicineRepository(db);
			PharmaCompany = new PharmaCompanyRepository(db);
			Pharmacy = new PharmacyRepository(db);
        }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
