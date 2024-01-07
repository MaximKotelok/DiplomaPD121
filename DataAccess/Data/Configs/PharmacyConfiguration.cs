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
	public class PharmacyConfiguration : IEntityTypeConfiguration<Pharmacy>
	{
		public void Configure(EntityTypeBuilder<Pharmacy> builder)
		{
			builder.HasData(
				new Pharmacy { Id = 1, Address = "Temp Address", Coord = "Temp Coord", PharmaCompanyID = 1, CityID = 1, Email = "kotelokmax2003@gmail.com" }
				);

		}
	}
}
