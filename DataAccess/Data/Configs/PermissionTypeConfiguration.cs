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
    public class PermissionTypeConfiguration : IEntityTypeConfiguration<PermissionType>
    {
        public void Configure(EntityTypeBuilder<PermissionType> builder)
        {
            builder.HasData(
                new PermissionType { Id = 1, Name = "заборонено" },
                new PermissionType { Id = 2, Name = "дозволено" },
                new PermissionType { Id = 3, Name = "за призначенням лікаря" },
                new PermissionType { Id = 4, Name = "з обережністю" }
            );
        }
    }
}
