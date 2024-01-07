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
	public class ProductAttributeGroupConfiguration : IEntityTypeConfiguration<ProductAttributeGroup>
	{
		public void Configure(EntityTypeBuilder<ProductAttributeGroup> builder)
		{
			builder.HasData(
				new ProductAttributeGroup { Id=1, Name="Загальні"},
				new ProductAttributeGroup { Id=2, Name="Таблетки"},
				new ProductAttributeGroup { Id=3, Name="Товари для тварин"},
				new ProductAttributeGroup { Id=4, Name= "Медична техніка" }
				);
		}
	}
}
