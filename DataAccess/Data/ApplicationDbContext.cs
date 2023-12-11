using Domain.Models;
using Microsoft.EntityFrameworkCore;
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
				new Category { Id=1, Title="Каталог Товарів"  },
				new Category { Id = 2, Title = "Ліки та профілактичні засоби", ParentCategoryID=1 },
				new Category { Id = 3, Title = "Вітаміни", ParentCategoryID = 2 },
				new Category { Id = 4, Title = "Вітамін С", ParentCategoryID = 3 },
				new Category { Id = 5, Title = "Аскорбінка", ParentCategoryID = 4 },
				new Category { Id = 6, Title = "Аскорбінка-КВ", ParentCategoryID = 5 }
				);
			modelBuilder.Entity<Medicine>().HasData(
				new Medicine { Id = 1, CategoryID=6, Title="Аскорбінка", Description= "Аскорбінка.", SpecialRow="Special Temp Row" }
				);

			modelBuilder.Entity<PharmaCompany>().HasData(
				new PharmaCompany { Id = 1, Title="АНЦ", Description="АНЦ."}
				);

			modelBuilder.Entity<Pharmacy>().HasData(
				new Pharmacy { Id = 1, Address="Temp Address", Coord="Temp Coord", PharmaCompanyID=1 }
				);

			modelBuilder.Entity<ConcreteProduct>().HasData(
				new ConcreteProduct { Id = 1, Price=100, ProductID=1, Quantity=2}
				);



		}
	}
}
