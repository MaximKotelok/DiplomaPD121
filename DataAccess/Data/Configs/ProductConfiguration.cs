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
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasData(
				new Product { Id = 5, CategoryID = 15, Title = "Тонометр ProMedica Classic автоматичний", ShortDescription = "Медхауз Свіс ГмбХ, ТОВ", Description = "..", BrandId = 3, ManufacturerID = 3, SeriesId = 1, PathToPhoto = "/images/product/Тонометр.jpg" },
				new Product { Id = 6, CategoryID = 16, Title = "Глюкометр GluNeo Lite", ShortDescription = "Infopia Co. Ltd.", Description = "..", BrandId = 3, ManufacturerID = 3, SeriesId = 1, PathToPhoto = "/images/product/Глюкометр.jpg" }
				);
        }
    }
}
