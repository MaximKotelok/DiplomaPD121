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
	public class ProductAttributeGroupConfiguration : IEntityTypeConfiguration<ProductAttributeGroup>
	{
		public void Configure(EntityTypeBuilder<ProductAttributeGroup> builder)
		{
			builder.HasData(
				new ProductAttributeGroup { Id = 1, Name = "Загальні", IsDisableShow=true },
				new ProductAttributeGroup { Id = 2, Name = "Таблетки", Description = "<h1>Склад</h1><h1><br></h1><h1>Лікарська форма</h1><h1><br></h1><h1>Фармакотерапевтична група</h1><h1><br></h1><h1>Фармакологічні властивості</h1><h1><br></h1><h1>Показання</h1><h1><br></h1><h1>Протипоказання</h1><h1><br></h1><h1>Взаємодія з іншими лікарськими засобами та інші види взаємодії</h1><h1><br></h1><h1>Особливості щодо застосування</h1><h1><br></h1><h1>Спосіб застосування та дози</h1><h1><br></h1><h1>Передозування</h1><h1><br></h1><h1>Побічні ефекти</h1><h1><br></h1><h1>Термін придатності</h1><p><br></p><h1>Умови зберігання</h1><h1><br></h1><h1>Упаковка</h1><p><br></p><h1>Категорія відпуску</h1><p><br></p><h1>Виробник</h1><p><br></p><h1>Адреса</h1>", DescriptionName="Інструкція" },
				new ProductAttributeGroup { Id = 3, Name = "Товари для тварин" },
				new ProductAttributeGroup { Id = 4, Name = "Медична техніка" }
				);
		}
	}
}
