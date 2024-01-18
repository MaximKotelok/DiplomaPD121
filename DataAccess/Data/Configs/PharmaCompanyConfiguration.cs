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
	public class PharmaCompanyConfiguration : IEntityTypeConfiguration<PharmaCompany>
	{
		public void Configure(EntityTypeBuilder<PharmaCompany> builder)
		{
			builder.HasData(
				new PharmaCompany { Id = 1, Title = "АНЦ", Description = "АНЦ." },
				new PharmaCompany { Id = 2, Title = "Подорожник", Description = "Подорожник." }
				);

		}
	}
}
