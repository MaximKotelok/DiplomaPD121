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
	public class ProductAttributeConfiguration : IEntityTypeConfiguration<ProductAttribute>
	{
		public void Configure(EntityTypeBuilder<ProductAttribute> builder)
		{
			builder.HasData(
				new ProductAttribute {Id=1, Index = 1, Name = "Види тварин", ProductAttributeGroupID= 3 },
				new ProductAttribute { Id = 2, Index = 2, Name = "Вага", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 3, Index = 3, Name = "Тип іграшки", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 4, Index = 4, Name = "Матеріал виготовлення", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 5, Index = 5, Name = "Додаткові функції", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 6, Index = 6, Name = "Призначення", ProductAttributeGroupID = 3 },				
				new ProductAttribute { Id = 7, Index = 7, Name = "Серія/Лінійка", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 8, Index = 8, Name = "Об'єм", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 9, Index = 9, Name = "Вік тварини", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 10, Index = 10, Name = "Розмір", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 11, Index = 11, Name = "Дозування (ветеринарія)", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 12, Index = 12, Name = "Діюча речовина (ветеринарія)", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 13, Index = 13, Name = "Вага тварини", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 14, Index = 14, Name = "Клас корму", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 15, Index = 15, Name = "Інгредієнти", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 16, Index = 16, Name = "Розмір тварини", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 17, Index = 17, Name = "Тип корму", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 18, Index = 18, Name = "Довжина", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 19, Index = 19, Name = "Ширина", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 20, Index = 20, Name = "Особливість", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 21, Index = 21, Name = "Колір", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 22, Index = 22, Name = "Максимальне навантаження", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 23, Index = 23, Name = "Тип", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 24, Index = 24, Name = "Тип туалету", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 25, Index = 25, Name = "Види риб", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 26, Index = 26, Name = "Вид наповнювача за складом", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 27, Index = 27, Name = "Види тварин", ProductAttributeGroupID = 3 },
				new ProductAttribute { Id = 28, Index = 28, Name = "Види птахів", ProductAttributeGroupID = 3 },
			
				new ProductAttribute { Id = 30, Index = 1, Name = "Гарантія виробника", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 31, Index = 2, Name = "Тип", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 32, Index = 3, Name = "Колір", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 33, Index = 4, Name = "Ступінь втрати слуху", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 34, Index = 5, Name = "Характеристики", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 35, Index = 6, Name = "Тип вимірювання", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 36, Index = 7, Name = "Різновид інгаляторів", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 37, Index = 8, Name = "Тип вимірювання тиску", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 38, Index = 9, Name = "Розмір манжети", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 39, Index = 10, Name = "Властивості", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 40, Index = 11, Name = "Зовнішній діаметр голки, мм", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 41, Index = 12, Name = "Довжина голки", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 42, Index = 13, Name = "Зовнішній діаметр голки, мм", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 43, Index = 14, Name = "Концентрація інсуліна (U)", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 44, Index = 15, Name = "Тип голки в комплекті", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 45, Index = 16, Name = "Кількість елементів", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 46, Index = 17, Name = "Термін використання", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 47, Index = 18, Name = "Вимірювання показників", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 49, Index = 19, Name = "Обсяг забору крові", ProductAttributeGroupID = 4 },
				new ProductAttribute { Id = 50, Index = 20, Name = "Калібрування", ProductAttributeGroupID = 4 }
			);
		}
	}
}
