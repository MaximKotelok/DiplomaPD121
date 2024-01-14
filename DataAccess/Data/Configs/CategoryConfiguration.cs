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
	public class CategoryConfiguration : IEntityTypeConfiguration<Category>
	{
		public void Configure(EntityTypeBuilder<Category> builder)
		{
			builder.HasData(
				new Category { Id = 1, Title = "Каталог Товарів" },
				new Category { Id = 2, Title = "Ліки та профілактичні засоби", ParentCategoryID = 1 },
				new Category { Id = 3, Title = "Вітаміни", ParentCategoryID = 2 },
				new Category { Id = 4, Title = "Вітамін С", ParentCategoryID = 3 },
				new Category { Id = 5, Title = "Аскорбінка", ParentCategoryID = 4 },
				new Category { Id = 6, Title = "Аскорбінка-КВ", ParentCategoryID = 5 },
				new Category { Id = 7, Title = "Ліки та профілактичні засоби", ParentCategoryID = 1 },
				new Category { Id = 8, Title = "Вітаміни та мінерали", ParentCategoryID = 1 },
				new Category { Id = 9, Title = "Краса та догляд", ParentCategoryID = 1 },
				new Category { Id = 10, Title = "Спорт та здоров'я", ParentCategoryID = 1 },
				new Category { Id = 11, Title = "Товари для дітей та мам", ParentCategoryID = 1 },
				new Category { Id = 12, Title = "Вироби медичного призначення", ParentCategoryID = 1 },
				new Category { Id = 13, Title = "Ортопедія та реабілітація", ParentCategoryID = 1 },
				new Category { Id = 14, Title = "Медична техніка", ParentCategoryID = 1 },
				new Category { Id = 15, Title = "Товари для тварин", ParentCategoryID = 1 },
				new Category { Id = 16, Title = "Тонометри", ParentCategoryID = 14 },
				new Category { Id = 17, Title = "Глюкометри", ParentCategoryID = 14 }
				);

		}
	}
}
