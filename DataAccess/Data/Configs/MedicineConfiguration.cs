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
				new Medicine { Id = 1, CategoryID = 6, Title = "Аскорбінка-КВ", ShortDescription = "таблетки зі смак. апельсину по 25 мг №10 в етикет.", Description = "...", ActiveSubstanceID = 1, BrandID = 3, ManufacturerID = 3, SeriesID = 1, PathToPhoto = "/images/product/Аскорбінка 1.webp", ProductAttributeGroupID = 2, AdultsID=1, AllergiesID=2, ChildrenID=3, DiabeticsID=4, NursingMothersID=1, PregnantID=2, DriversID=3 },
				new Medicine { Id = 2, CategoryID = 6, Title = "Аскорбінка-КВ", ShortDescription = "таблетки зі смак. манго по 25 мг №10 в етикет.", Description = "..", ActiveSubstanceID = 1, BrandID = 3, ManufacturerID = 3, SeriesID = 1, PathToPhoto = "/images/product/Аскорбінка 2.webp", ProductAttributeGroupID = 2, AdultsID = 1, AllergiesID = 2, ChildrenID = 3, DiabeticsID = 2, NursingMothersID = 1, PregnantID = 3, DriversID = 3 },
				new Medicine { Id = 3, CategoryID = 6, Title = "Аскорбінка-КВ", ShortDescription = "таблетки зі смак. полуниці по 25 мг №10 в етикет.", Description = "..", ActiveSubstanceID = 1, BrandID = 3, ManufacturerID = 3, SeriesID = 1, PathToPhoto = "/images/product/Аскорбінка 3.jpg", ProductAttributeGroupID = 2, AdultsID = 1, AllergiesID = 2, ChildrenID = 3, DiabeticsID = 4, NursingMothersID = 4, PregnantID = 4, DriversID = 1 },
				new Medicine { Id = 4, CategoryID = 6, Title = "Аскорбінка-КВ", ShortDescription = "таблетки зі смак. тутті-фруті по 25 мг №10 в етикет.", Description = "..", ActiveSubstanceID = 1, BrandID = 3, ManufacturerID = 3, SeriesID = 1, PathToPhoto = "/images/product/Аскорбінка 4.jpg", ProductAttributeGroupID = 2, AdultsID = 1, AllergiesID = 2, ChildrenID = 3, DiabeticsID = 4, NursingMothersID = 1, PregnantID = 2, DriversID = 1 }
				);
		}
	}
}
