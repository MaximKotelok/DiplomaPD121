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
                new PermissionType { Id = 1, Title = "заборонено", PathToPhoto= "/images/permissionType/denied.png" },
                new PermissionType { Id = 2, Title = "дозволено", PathToPhoto = "/images/permissionType/allowed.png" },
                new PermissionType { Id = 3, Title = "за призначенням лікаря", PathToPhoto = "/images/permissionType/warning.png" },
                new PermissionType { Id = 4, Title = "з обережністю", PathToPhoto = "/images/permissionType/warning.png" }
            );
        }
    }
}
