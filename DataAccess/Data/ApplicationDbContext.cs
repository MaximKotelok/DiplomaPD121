using Domain.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Repository.Data.Configs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace DataAccess.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
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
        public DbSet<ProductAttribute>? Attributes { get; set; }
        public DbSet<ProductAttributeGroup>? ProductAttributeGroups { get; set; }
        public DbSet<ProductExistAttribute>? ProductExistAttributes { get; set; }
        public DbSet<ProductConfirm>? ProductConfirms { get; set; }
        public DbSet<ReservationItem>? ReservationItems { get; set; }
        public DbSet<ProductProperty>? Properties { get; set; }
        public DbSet<SimilarProductGroup>? SimilarProductGroups { get; set; }
        public DbSet<SimilarProductItem>? SimilarProductItems { get; set; }
        public DbSet<Country>? Countries { get; set; }
        public DbSet<Brand>? Brands { get; set; }
        public DbSet<Series>? Series { get; set; }
        public DbSet<Manufacturer>? Manufacturers { get; set; }
        public DbSet<Reservation>? Reservations { get; set; }
        public DbSet<ReservationStatus>? ReservationStatuses { get; set; }
        public DbSet<ProductStatus>? ProductStatuses { get; set; }
        public DbSet<PermissionType>? PermissionTypes { get; set; }
		
		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);			

			new ProductPropertyConfiguration().Configure(modelBuilder.Entity<ProductProperty>());

            new ProductAttributeGroupConfiguration().Configure(modelBuilder.Entity<ProductAttributeGroup>());

            new ProductAttributeConfiguration().Configure(modelBuilder.Entity<ProductAttribute>());

            new CountryConfiguration().Configure(modelBuilder.Entity<Country>());

            new BrandConfiguration().Configure(modelBuilder.Entity<Brand>());

            new ManufacturerConfiguration().Configure(modelBuilder.Entity<Manufacturer>());

            new SeriesConfiguration().Configure(modelBuilder.Entity<Series>());

            new ActiveSubstanceConfiguration().Configure(modelBuilder.Entity<ActiveSubstance>());

            new CityConfiguration().Configure(modelBuilder.Entity<City>());

            new CategoryConfiguration().Configure(modelBuilder.Entity<Category>());

            new MedicineConfiguration().Configure(modelBuilder.Entity<Medicine>());

            new PharmaCompanyConfiguration().Configure(modelBuilder.Entity<PharmaCompany>());

            new PharmacyConfiguration().Configure(modelBuilder.Entity<Pharmacy>());          

            new ReservationStatusConfiguration().Configure(modelBuilder.Entity<ReservationStatus>());

            new ProductStatusConfiguration().Configure(modelBuilder.Entity<ProductStatus>());
            
            new ProductConfiguration().Configure(modelBuilder.Entity<Product>());

            new SimilarGroupConfiguration().Configure(modelBuilder.Entity<SimilarProductGroup>());
            
            new SimilarItemConfiguration().Configure(modelBuilder.Entity<SimilarProductItem>());                        

			new ConcreteProductConfiguration().Configure(modelBuilder.Entity<ConcreteProduct>());
			
            new ProductExistAttributeConfiguration().Configure(modelBuilder.Entity<ProductExistAttribute>());
            
            new PermissionTypeConfiguration().Configure(modelBuilder.Entity<PermissionType>());
            
			modelBuilder.Entity<User>().Navigation(e => e.FavProducts).AutoInclude();

		}
    }
}
