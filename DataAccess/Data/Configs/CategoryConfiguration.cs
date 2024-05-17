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
				new Category { Id = 1, Title = "Каталог Товарів", PathToPhoto = "" },
				new Category { Id = 2, Title = "Ліки та профілактичні засоби", ParentCategoryID = 1, PathToPhoto = "/images/category/icon/Medicines.png"},
				new Category { Id = 3, Title = "Вітаміни", ParentCategoryID = 2, IsDisplayOnBottom = true },
				new Category { Id = 4, Title = "Вітамін С", ParentCategoryID = 3, PathToPhoto = "/images/category/png/C.png", CanHasProducts = true },
				new Category { Id = 5, Title = "Аскорбінка", ParentCategoryID = 4 },
				new Category { Id = 6, Title = "Аскорбінка-КВ", ParentCategoryID = 5 },
				new Category { Id = 7, Title = "Вітаміни та мінерали", ParentCategoryID = 1, PathToPhoto = "/images/category/icon/Vitamines.png" },
				new Category { Id = 8, Title = "Краса та догляд", ParentCategoryID = 1, PathToPhoto = "/images/category/icon/Care.png" },
				new Category { Id = 9, Title = "Спорт та здоров'я", ParentCategoryID = 1, PathToPhoto = "/images/category/icon/Sport.png" },
				new Category { Id = 10, Title = "Товари для дітей та мам", ParentCategoryID = 1, PathToPhoto = "/images/category/icon/Kids.png" },
				new Category { Id = 11, Title = "Вироби медичного призначення", ParentCategoryID = 1, PathToPhoto = "/images/category/icon/Medicine staff.png" },
				new Category { Id = 12, Title = "Ортопедія та реабілітація", ParentCategoryID = 1, PathToPhoto = "/images/category/icon/Reabilitation.png" },
				new Category { Id = 13, Title = "Медична техніка", ParentCategoryID = 1, PathToPhoto = "/images/category/icon/Medicine technic.png" },
				new Category { Id = 14, Title = "Товари для тварин", ParentCategoryID = 1, PathToPhoto = "/images/category/icon/Animals.png" },
				new Category { Id = 15, Title = "Тонометри", ParentCategoryID = 14, CanHasProducts = true },
				new Category { Id = 16, Title = "Глюкометри", ParentCategoryID = 14, CanHasProducts = true },
				new Category { Id = 17, Title = "Вітаміни групи В", ParentCategoryID = 3, PathToPhoto = "/images/category/png/B.png", CanHasProducts = true },				
				new Category { Id = 18, Title = "Біотин", ParentCategoryID = 3, PathToPhoto = "/images/category/png/Biotin.png", CanHasProducts = true },
				new Category { Id = 19, Title = "Вітамін D", ParentCategoryID = 3, PathToPhoto = "/images/category/png/D.png", CanHasProducts = true },
				new Category { Id = 20, Title = "Вітамін К", ParentCategoryID = 3, PathToPhoto = "/images/category/png/K.png", CanHasProducts = true },
				new Category { Id = 921, Title = "Схуднення", ParentCategoryID = 9, PathToRecomendedPhoto= "/images/category/recomemnded/1.png", IsRecomended = true },
				new Category { Id = 922, Title = "Від застуди та грипу", ParentCategoryID = 2, PathToRecomendedPhoto= "/images/category/recomemnded/2.png", IsRecomended = true },
				new Category { Id = 923, Title = "Від стресу", ParentCategoryID = 2, PathToRecomendedPhoto= "/images/category/recomemnded/3.png", IsRecomended = true }
				);

		}
	}
}
