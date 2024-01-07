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
	public class ReservationStatusConfiguration : IEntityTypeConfiguration<ReservationStatus>
	{
		public void Configure(EntityTypeBuilder<ReservationStatus> builder)
		{
			builder.HasData(
				new ReservationStatus { Id = 1, Status= "В очікуванні" },
				new ReservationStatus { Id = 2, Status= "Підтверджено" },
				new ReservationStatus { Id = 3, Status= "Скасовано" },
				new ReservationStatus { Id = 4, Status= "Завершено" }
				);

		}
	}
}
