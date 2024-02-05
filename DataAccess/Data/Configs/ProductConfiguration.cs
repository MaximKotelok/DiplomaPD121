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
				new Product { Id = 5, CategoryID = 15, Title = "Тонометр ProMedica Classic автоматичний", ShortDescription = "Медхауз Свіс ГмбХ, ТОВ", Description = "..", BrandID = 3, ManufacturerID = 3, SeriesID = 1, PathToPhoto = "/images/product/Тонометр.jpg", ProductAttributeGroupID = 4 },
				new Product { Id = 6, CategoryID = 16, Title = "Глюкометр GluNeo Lite", ShortDescription = "Infopia Co. Ltd.", Description = "..", BrandID = 3, ManufacturerID = 3, SeriesID = 1, PathToPhoto = "/images/product/Глюкометр.jpg", ProductAttributeGroupID=4 }
				);
        }
    }
}
