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
	public class SimilarGroupConfiguration : IEntityTypeConfiguration<SimilarProductGroup>
	{
		public void Configure(EntityTypeBuilder<SimilarProductGroup> builder)
		{
			builder.HasData(
					new SimilarProductGroup { Id = 1, SimilarBy = "Смак", Name="Смаки Аскорбінок" }
				);

		}
	}
}
