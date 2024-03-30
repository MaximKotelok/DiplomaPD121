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
	public class CityConfiguration : IEntityTypeConfiguration<City>
	{
		public void Configure(EntityTypeBuilder<City> builder)
		{
			builder.HasData(new City { Id = 1, NameCity = "Львів", Latitude = "49.842957", Longitude = "24.031111" });
			builder.HasData(new City { Id = 2, NameCity = "Ужгород", Latitude = "48.621025", Longitude = "22.288229" });
			builder.HasData(new City { Id = 3, NameCity = "Вінниця", Latitude = "49.2333", Longitude = "28.4833" });
			builder.HasData(new City { Id = 4, NameCity = "Київ", Latitude = "50.4500", Longitude = "30.5233" });
			builder.HasData(new City { Id = 5, NameCity = "Тернопіль", Latitude = "49.5667", Longitude = "25.6000" });

		}
	}
}
