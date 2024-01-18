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
	public class MedicineConfiguration// : IEntityTypeConfiguration<Medicine>//Застаріла версія
	{
		//public void Configure(EntityTypeBuilder<Medicine> builder)
		//{
			/*builder.HasData(
				new Medicine { Id = 1, CategoryID = 6, Title = "Аскорбінка-КВ", ShortDescription = "таблетки зі смак. апельсину по 25 мг №10 в етикет.", Description = "...", ActiveSubstanceID = 1, BrandId = 3, ManufacturerID = 3, SeriesId = 1, PathToPhoto= "/images/product/Аскорбінка 1.webp" },
				new Medicine { Id = 2, CategoryID = 6, Title = "Аскорбінка-КВ", ShortDescription = "таблетки зі смак. манго по 25 мг №10 в етикет.", Description = "..", ActiveSubstanceID = 1, BrandId = 3, ManufacturerID = 3, SeriesId = 1,  PathToPhoto= "/images/product/Аскорбінка 2.webp" },
				new Medicine { Id = 3, CategoryID = 6, Title = "Аскорбінка-КВ", ShortDescription = "таблетки зі смак. полуниці по 25 мг №10 в етикет.", Description = "..", ActiveSubstanceID = 1, BrandId = 3, ManufacturerID = 3, SeriesId = 1,  PathToPhoto= "/images/product/Аскорбінка 3.jpg" },
				new Medicine { Id = 4, CategoryID = 6, Title = "Аскорбінка-КВ", ShortDescription = "таблетки зі смак. тутті-фруті по 25 мг №10 в етикет.", Description = "..", ActiveSubstanceID = 1, BrandId = 3, ManufacturerID = 3, SeriesId = 1,  PathToPhoto= "/images/product/Аскорбінка 4.jpg" }
				);*/
		//}
	}
}
