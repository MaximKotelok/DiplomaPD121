using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Data.Configs
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
			builder
			.HasOne(e => e.ProductConfirm)
			.WithOne(e => e.Product)
			.HasForeignKey<ProductConfirm>(e=>e.ProductID)
			.IsRequired(false)
			.OnDelete(DeleteBehavior.Cascade);

			builder.HasData(
				new Product { Id = 5, CategoryID = 15, Title = "Тонометр ProMedica Classic автоматичний", ShortDescription = "Медхауз Свіс ГмбХ, ТОВ", Description = "..", BrandID = 3, ManufacturerID = 3, SeriesID = 1, PathToPhoto = "/images/product/Тонометр.jpg", ProductAttributeGroupID = 4 },
				new Product { Id = 6, CategoryID = 16, Title = "Глюкометр GluNeo Lite", ShortDescription = "Infopia Co. Ltd.", Description = "..", BrandID = 3, ManufacturerID = 3, SeriesID = 1, PathToPhoto = "/images/product/Глюкометр.jpg", ProductAttributeGroupID=4 }
				);
			builder.HasData(
				new Product { Id = 7, CategoryID = 15, Title = "Термометр для аптек", ShortDescription = "Medical Devices Corp.", Description = "Точний та швидкий термометр для вимірювання температури", BrandID = 3, ManufacturerID = 2, SeriesID = 1, ProductAttributeGroupID = 2 },
				new Product { Id = 8, CategoryID = 16, Title = "Антисептик для рук", ShortDescription = "Hygiene Solutions Ltd.", Description = "Ефективний антисептик для регулярного використання", BrandID = 3, ManufacturerID = 2, SeriesID = 1, ProductAttributeGroupID = 2 }
			);
			builder.HasData(
				new Product { Id = 9, CategoryID = 15, Title = "Перший допоміжний набір", ShortDescription = "Safety First Medical", Description = "Комплект для першої допомоги з необхідним медичним обладнанням", BrandID = 2, ManufacturerID = 2, SeriesID = 1, ProductAttributeGroupID = 4 },
				new Product { Id = 10, CategoryID = 16, Title = "Маска медична", ShortDescription = "Protective Gear Co.", Description = "Одноразова медична маска для захисту від бактерій та вірусів", BrandID = 2, ManufacturerID = 1, SeriesID = 1, ProductAttributeGroupID = 4 }
			);

			builder.HasData(
				new Product { Id = 11, CategoryID = 14, Title = "Антигрипові таблетки", ShortDescription = "Health Pharmaceuticals", Description = "Ефективні таблетки для лікування та профілактики грипу", BrandID = 1, ManufacturerID = 2, SeriesID = 1, ProductAttributeGroupID = 4 },
				new Product { Id = 12, CategoryID = 15, Title = "Вітамін С", ShortDescription = "NutriWellness Labs", Description = "Додатковий вітамін С для підтримки імунітету", BrandID = 3, ManufacturerID = 1, SeriesID = 1,  ProductAttributeGroupID = 4 }
			);
		}
    }
}
