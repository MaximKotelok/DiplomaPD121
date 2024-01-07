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
	public class ManufacturerConfiguration : IEntityTypeConfiguration<Manufacturer>
	{
		public void Configure(EntityTypeBuilder<Manufacturer> builder)
		{
			builder.HasData(
				new Manufacturer { Id = 1, Name = "Manufacturer 1", CountryManufactureID = 3, URLSite = "google.com", Address = "Some address 1" },
				new Manufacturer { Id = 2, Name = "Manufacturer 2", CountryManufactureID = 2, URLSite = "google.com", Address = "Some address 2" },
				new Manufacturer { Id = 3, Name = "Manufacturer 3", CountryManufactureID = 1, URLSite = "google.com", Address = "Some address 3" }
				);

		}
	}
}
