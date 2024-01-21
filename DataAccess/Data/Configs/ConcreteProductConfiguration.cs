using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Data.Configs
{
	public class ConcreteProductConfiguration : IEntityTypeConfiguration<ConcreteProduct>
	{
		public void Configure(EntityTypeBuilder<ConcreteProduct> builder)
		{
			builder.HasData(
			new ConcreteProduct { Id = 1, Price = 100, ProductID = 1, Quantity = 2, PharmacyID = 1 },
			new ConcreteProduct { Id = 2, Price = 10, ProductID = 1, Quantity = 1, PharmacyID = 2 },
			new ConcreteProduct { Id = 3, Price = 20, ProductID = 2, Quantity = 10, PharmacyID = 3 },
			new ConcreteProduct { Id = 4, Price = 30, ProductID = 2, Quantity = 3, PharmacyID = 2 },
			new ConcreteProduct { Id = 5, Price = 40, ProductID = 3, Quantity = 5, PharmacyID = 1 },
			new ConcreteProduct { Id = 6, Price = 50, ProductID = 3, Quantity = 5, PharmacyID = 2 },
			new ConcreteProduct { Id = 7, Price = 25, ProductID = 4, Quantity = 4, PharmacyID = 3 },
			new ConcreteProduct { Id = 8, Price = 125, ProductID = 4, Quantity = 5, PharmacyID = 2 },
			new ConcreteProduct { Id = 9, Price = 105, ProductID = 5, Quantity = 15, PharmacyID = 2 },
			new ConcreteProduct { Id = 10, Price = 80, ProductID = 5, Quantity = 1, PharmacyID = 1 },
			new ConcreteProduct { Id = 11, Price = 230, ProductID = 6, Quantity = 6, PharmacyID = 4 }
				);
		}
	}
}

