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
				new Medicine { Id = 1, CategoryID = 6, Title = "Аскорбінка-КВ", ShortDescription = "таблетки зі смак. апельсину по 25 мг №10 в етикет.", Description = "<h1>Склад</h1><p>1</p><h1>Лікарська форма</h1><p>2</p><h1>Фармакотерапевтична група</h1><p>3</p><h1>Фармакологічні властивості</h1><p>4</p><h1>Показання</h1><p>5</p><h1>Протипоказання</h1><p>6</p><h1>Взаємодія з іншими лікарськими засобами та інші види взаємодії</h1><p>7</p><h1>Особливості щодо застосування</h1><p>8</p><h1>Спосіб застосування та дози</h1><p>9</p><h1>Передозування</h1><p>10</p><h1>Побічні ефекти</h1><p>11</p><h1>Термін придатності</h1><p>12</p><h1>Умови зберігання</h1><p>13</p><h1>Упаковка</h1><p>14</p><h1>Категорія відпуску</h1><p>15</p><h1>Виробник</h1><p>16</p><h1>Адреса</h1><p>17</p>", ActiveSubstanceID = 1, BrandID = 3, ManufacturerID = 3, SeriesID = 1, PathToPhoto = "/images/product/Аскорбінка 1.webp", ProductAttributeGroupID = 2, AdultsID=1, AllergiesID=2, ChildrenID=3, DiabeticsID=4, NursingMothersID=1, PregnantID=2, DriversID=3 },
				new Medicine { Id = 2, CategoryID = 6, Title = "Аскорбінка-КВ", ShortDescription = "таблетки зі смак. манго по 25 мг №10 в етикет.", Description = "..", ActiveSubstanceID = 1, BrandID = 3, ManufacturerID = 3, SeriesID = 1, PathToPhoto = "/images/product/Аскорбінка 2.webp", ProductAttributeGroupID = 2, AdultsID = 1, AllergiesID = 2, ChildrenID = 3, DiabeticsID = 2, NursingMothersID = 1, PregnantID = 3, DriversID = 3 },
				new Medicine { Id = 3, CategoryID = 6, Title = "Аскорбінка-КВ", ShortDescription = "таблетки зі смак. полуниці по 25 мг №10 в етикет.", Description = "..", ActiveSubstanceID = 1, BrandID = 3, ManufacturerID = 3, SeriesID = 1, PathToPhoto = "/images/product/Аскорбінка 3.jpg", ProductAttributeGroupID = 2, AdultsID = 1, AllergiesID = 2, ChildrenID = 3, DiabeticsID = 4, NursingMothersID = 4, PregnantID = 4, DriversID = 1 },
				new Medicine { Id = 4, CategoryID = 6, Title = "Аскорбінка-КВ", ShortDescription = "таблетки зі смак. тутті-фруті по 25 мг №10 в етикет.", Description = "..", ActiveSubstanceID = 1, BrandID = 3, ManufacturerID = 3, SeriesID = 1, PathToPhoto = "/images/product/Аскорбінка 4.jpg", ProductAttributeGroupID = 2, AdultsID = 1, AllergiesID = 2, ChildrenID = 3, DiabeticsID = 4, NursingMothersID = 1, PregnantID = 2, DriversID = 1 }
				);
		}
	}
}
