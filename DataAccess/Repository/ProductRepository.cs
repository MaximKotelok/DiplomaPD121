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
    public class ProductRepository : Repository<Product>, IProductRepository
	{
        public ProductRepository(ApplicationDbContext db): base(db) { }

        public void Update(Product product)
        {
            _db?.Products?.Update(product);
        }
    }
}
