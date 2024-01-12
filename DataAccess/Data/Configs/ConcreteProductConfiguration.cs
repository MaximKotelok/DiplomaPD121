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
				new ConcreteProduct { Id = 1, Price = 100, ProductID = 1, Quantity = 2, PharmacyID = 1 }
				);
            builder.HasData(
                new ConcreteProduct { Id = 2, Price = 100, ProductID = 1, Quantity = 3, PharmacyID = 2 }
                );
            builder.HasData(
                new ConcreteProduct { Id = 3, Price = 100, ProductID = 1, Quantity = 5, PharmacyID = 3 }
                );
        }
	}
}
