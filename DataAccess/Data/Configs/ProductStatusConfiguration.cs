using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility;

namespace Repository.Data.Configs
{
    public class ProductStatusConfiguration : IEntityTypeConfiguration<ProductStatus>
    {
        public void Configure(EntityTypeBuilder<ProductStatus> builder)
        {
            builder.HasData(
                new ProductStatus { Id = 1, Status = SD.ProductStatusConfirmed },
                new ProductStatus { Id = 2, Status = SD.ProductStatusUnderConsideration },
                new ProductStatus { Id = 3, Status = SD.ProductStatusRejected }
                );
        }
    }
}
