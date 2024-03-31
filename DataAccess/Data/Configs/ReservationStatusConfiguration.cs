using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility;

namespace Repository.Data.Configs
{
	public class ReservationStatusConfiguration : IEntityTypeConfiguration<ReservationStatus>
	{
		public void Configure(EntityTypeBuilder<ReservationStatus> builder)
		{
			builder.HasData(
				new ReservationStatus { Id = 1, Status= SD.ReservationStatusWaiting, Color= "#FF9500", Path= "/images/statuses/ReservationStatusWaiting.png" },
				new ReservationStatus { Id = 2, Status= SD.ProductStatusConfirmed, Color= "#007AFF", Path = "/images/statuses/ProductStatusConfirmed.png" },
				new ReservationStatus { Id = 3, Status= SD.ReservationStatusCanceled, Color = "#FF3B30", Path = "/images/statuses/ReservationStatusCanceled.png" },
				new ReservationStatus { Id = 4, Status= SD.ReservationStatusFinished, Color= "#3BA42A", Path = "/images/statuses/ReservationStatusFinished.png" }
				);

		}
	}
}
