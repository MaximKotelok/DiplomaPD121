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
	public class ActiveSubstanceConfiguration : IEntityTypeConfiguration<ActiveSubstance>
	{
		public void Configure(EntityTypeBuilder<ActiveSubstance> builder)
		{
			builder.HasData(new ActiveSubstance { Id = 1, Title = "аскорбінова кислота" },
							new ActiveSubstance { Id = 2, Title = "парацетамол" },
							new ActiveSubstance { Id = 3, Title = "кофеїн" },
							new ActiveSubstance { Id = 4, Title = "ацетилсаліцилова кислота" }
			);

		}
	}
}
