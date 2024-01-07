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
	public class ProductPropertyConfiguration : IEntityTypeConfiguration<ProductProperty>
	{
		public void Configure(EntityTypeBuilder<ProductProperty> builder)
		{
			builder.HasKey(table => new
			{
				table.ProductId,
				table.AttributeId
			});

		}
	}
}
