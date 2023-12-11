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
    public class ConcreteProductRepository : Repository<ConcreteProduct>, IConcreteProductRepository
	{
        public ConcreteProductRepository(ApplicationDbContext db): base(db) { }

        public void Update(ConcreteProduct concreteProduct)
        {
            _db?.ConcreteProducts?.Update(concreteProduct);
        }
    }
}
