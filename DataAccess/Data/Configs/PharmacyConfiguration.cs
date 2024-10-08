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
	public class PharmacyConfiguration : IEntityTypeConfiguration<Pharmacy>
	{
		public void Configure(EntityTypeBuilder<Pharmacy> builder)
		{
			builder.HasOne(a => a.User).WithOne(a => a.Pharmacy).HasForeignKey<Pharmacy>(a=>a.UserID);

			builder.HasData(
				new Pharmacy { Id = 1, Address = "Temp Address", Latitude = "49.842957", Longitude = "24.031511", PharmaCompanyID = 1, CityID = 1, WorkingWeekOpenTime="10:00", WorkingWeekCloseTime="20:00", WeekendOpenTime = "11:00", WeekendCloseTime = "19:00" },
				new Pharmacy { Id = 2, Address = "Temp Address2", Latitude = "49.842757", Longitude = "24.031211", PharmaCompanyID = 1, CityID = 1, WorkingWeekOpenTime = "11:00", WorkingWeekCloseTime = "21:00", WeekendOpenTime = "11:00", WeekendCloseTime = "21:00" },
				new Pharmacy { Id = 3, Address = "Temp Address3", Latitude = "49.842157", Longitude = "24.031611", PharmaCompanyID = 1, CityID = 1, WorkingWeekOpenTime = "00:00", WorkingWeekCloseTime = "23:59", WeekendOpenTime = "00:00", WeekendCloseTime = "23:59" },
				new Pharmacy {Id = 4, Address = "Temp Address4", Latitude = "49.842557", Longitude = "24.031411", PharmaCompanyID = 1, CityID = 1, WorkingWeekOpenTime = "09:00", WorkingWeekCloseTime = "18:00", WeekendOpenTime = "11:00", WeekendCloseTime = "17:00" }
				);


		}
	}
}
