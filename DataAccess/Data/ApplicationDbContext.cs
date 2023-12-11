using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace DataAccess.Data
{
	public class ApplicationDbContext:DbContext
	{
		public ApplicationDbContext(DbContextOptions options)
			: base(options) { }

		public DbSet<ConcreteProduct>? ConcreteProducts { get; set; }
		public DbSet<Product>? Products { get; set; }
		public DbSet<Medicine>? Medicines { get; set; }
		public DbSet<Category>? Categories { get; set; }
		public DbSet<PharmaCompany>? PharmaCompanies { get; set; }
		public DbSet<Pharmacy>? Pharmacies { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			
			modelBuilder.Entity<Category>().HasData(
				new Category { CategoryID=1, Title="Каталог Товарів"  },
				new Category { CategoryID=2, Title = "Ліки та профілактичні засоби", ParentCategoryID=1 },
				new Category { CategoryID=3, Title = "Вітаміни", ParentCategoryID = 2 },
				new Category { CategoryID = 4, Title = "Вітамін С", ParentCategoryID = 3 },
				new Category { CategoryID = 5, Title = "Аскорбінка", ParentCategoryID = 4 },
				new Category { CategoryID = 6, Title = "Аскорбінка-КВ", ParentCategoryID = 5 }
				);
			modelBuilder.Entity<Medicine>().HasData(
				new Medicine { ProductID=1, CategoryID=6, Title="Аскорбінка", Description= "Аскорбінка.", SpecialRow="Special Temp Row" }
				);

			modelBuilder.Entity<PharmaCompany>().HasData(
				new PharmaCompany { PharmaCompanyID=1, Title="АНЦ", Description="АНЦ."}
				);

			modelBuilder.Entity<Pharmacy>().HasData(
				new Pharmacy { PharmacyID=1, Address="Temp Address", Coord="Temp Coord", PharmaCompanyID=1 }
				);

			modelBuilder.Entity<ConcreteProduct>().HasData(
				new ConcreteProduct { ConcreteProductID=1, Price=100, ProductID=1, Quantity=2}
				);



		}
	}
}
