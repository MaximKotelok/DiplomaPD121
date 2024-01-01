using Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace DataAccess.Data
{
    public class ApplicationDbContext:IdentityDbContext<User>
	{
		public ApplicationDbContext(DbContextOptions options)
			: base(options) { }

		public DbSet<ConcreteProduct>? ConcreteProducts { get; set; }
		public DbSet<Product>? Products { get; set; }
		public DbSet<Medicine>? Medicines { get; set; }
		public DbSet<Category>? Categories { get; set; }
		public DbSet<PharmaCompany>? PharmaCompanies { get; set; }
		public DbSet<Pharmacy>? Pharmacies { get; set; }
		public DbSet<ActiveSubstance>? ActiveSubstances { get; set; }
		public DbSet<City>? Citys { get; set; }
		public DbSet<Zooproduct>? Zooproducts { get; set; }
		public DbSet<ProductAttribute>? Attributes { get; set; }
		public DbSet<ProductProperty>? Properties { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<ProductProperty>().HasKey(table => new {
				table.ProductId,
				table.AttributeId
			});

			modelBuilder.Entity<ProductAttribute>().HasData(
				new ProductAttribute { Id=1, Index=1, Name="SpecialRow1"},
				new ProductAttribute { Id = 2, Index = 2, Name = "SpecialRow2" },
				new ProductAttribute { Id = 3, Index = 3, Name = "SpecialRow3" },
				new ProductAttribute { Id = 4, Index = 1, Name = "Zoorow" }

				);

			modelBuilder.Entity<ActiveSubstance>().HasData(new ActiveSubstance { Id=1, Title= "аскорбінова кислота" });
			modelBuilder.Entity<City>().HasData(new City{ Id=1, NameCity= "Львів", Latitude="213213", Longitude="214124124" });

			modelBuilder.Entity<Category>().HasData(
				new Category { Id=1,Title="Каталог Товарів"  },
				new Category { Id = 2,Title = "Ліки та профілактичні засоби", ParentCategoryID=1 },
				new Category { Id = 3,Title = "Вітаміни", ParentCategoryID = 2 },
				new Category { Id = 4,Title = "Вітамін С", ParentCategoryID = 3 },
				new Category { Id = 5,Title = "Аскорбінка", ParentCategoryID = 4 },
				new Category { Id = 6,Title = "Аскорбінка-КВ", ParentCategoryID = 5 }
				);
			modelBuilder.Entity<Medicine>().HasData(
				new Medicine { Id = 1, CategoryID=6, Title="Аскорбінка", Description= "Аскорбінка.", ActiveSubstanceID=1 }
				);

			modelBuilder.Entity<Zooproduct>().HasData(
				new Zooproduct { Id=10, Title="Zooproduct", ForTest="Test", Description="1", CategoryID=6, PathToPhoto="1" }
				);

			modelBuilder.Entity<ProductProperty>().HasData(
				new ProductProperty { AttributeId = 1, ProductId = 1, Value = "Some data 1" },
				new ProductProperty { AttributeId = 2, ProductId = 1, Value = "Some data 2" },
				new ProductProperty { AttributeId = 3, ProductId = 1, Value = "Some data 3" },
				new ProductProperty { AttributeId = 4, ProductId = 10, Value = "Some data 4" }
				);

			modelBuilder.Entity<PharmaCompany>().HasData(
				new PharmaCompany { Id = 1, Title="АНЦ", Description="АНЦ."}
				);

			modelBuilder.Entity<Pharmacy>().HasData(
				new Pharmacy { Id = 1, Address="Temp Address", Coord="Temp Coord", PharmaCompanyID=1, CityID=1, Email= "kotelokmax2003@gmail.com" }
				);

			modelBuilder.Entity<ConcreteProduct>().HasData(
				new ConcreteProduct { Id = 1, Price=100, ProductID=1, Quantity=2, PharmacyID = 1 }
				);



		}
	}
}
