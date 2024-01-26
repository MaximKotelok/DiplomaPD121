using Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Data.Configs
{
	public class ProductExistAttributeConfiguration : IEntityTypeConfiguration<ProductExistAttribute>
	{
		public void Configure(EntityTypeBuilder<ProductExistAttribute> builder)
		{
			builder.HasData(
				new ProductExistAttribute { 
					Id = 1, 
					Name = "activeSubstanceID", 
					Description="Діюча речовина", 
					GroupID=2,
					ActionGetPath=nameof(ActiveSubstance)				
				}
				);
		}
	}
}
