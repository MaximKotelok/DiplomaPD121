﻿using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Data.Configs
{
	public class BrandConfiguration : IEntityTypeConfiguration<Brand>
	{
		public void Configure(EntityTypeBuilder<Brand> builder)
		{
			builder.HasData(
				new Brand { Id = 1, Name = "Brand 1", CountryBrandID = 3, PathToPhoto = "/images/brand/Brand 1.png" },
				new Brand { Id = 2, Name = "Brand 2", CountryBrandID = 3, PathToPhoto = "/images/brand/Brand 2.png" },
				new Brand { Id = 3, Name = "Brand 3", CountryBrandID = 1, PathToPhoto = "/images/brand/Brand 3.png", Description = "Best brand" }
				);

		}
	}
}
