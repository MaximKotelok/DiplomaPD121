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
	public class MedicineConfiguration : IEntityTypeConfiguration<Medicine>
	{
		public void Configure(EntityTypeBuilder<Medicine> builder)
		{
			builder.HasData(
				new Medicine { Id = 1, CategoryID = 6, Title = "Аскорбінка", Description = "Аскорбінка.", ActiveSubstanceID = 1, BrandId = 3, ManufacturerID = 3, SeriesId = 1, ShortDescription= "таблетки зі смак. полун. по 25 мг №10 в етикет." }
				);
		}
	}
}
