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
	public class SeriesConfiguration : IEntityTypeConfiguration<Series>
	{
		public void Configure(EntityTypeBuilder<Series> builder)
		{
			builder.HasData(
				new Series { Id = 1, Title = "Some title", Description = "Some desc" }
				);

		}
	}
}
