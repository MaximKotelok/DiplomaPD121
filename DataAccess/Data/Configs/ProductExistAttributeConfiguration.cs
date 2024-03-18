using Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Data.Configs
{
	public class ProductExistAttributeConfiguration : IEntityTypeConfiguration<ProductExistAttribute>
	{
		public void Configure(EntityTypeBuilder<ProductExistAttribute> builder)
		{
			builder.HasData(
				new ProductExistAttribute { 
					Id = 1, 
					Name = "activeSubstanceID", 
					Description="Діюча речовина", 
					GroupID=2,
					ActionGetPath= "ActiveSubstance/GetAllActiveSubstances"
				},
				new ProductExistAttribute
				{
					Id = 2,
					Name = "allergiesId",
					Description = "Алергіки",
					GroupID = 2,
					ActionGetPath = "PermissionType/GetAllPermissions"
				},
				new ProductExistAttribute
				{
					Id = 3,
					Name = "diabeticsId",
					Description = "Діабетики",
					GroupID = 2,
					ActionGetPath = "PermissionType/GetAllPermissions"
				},
				new ProductExistAttribute
				{
					Id = 4,
					Name = "nursingMothersId",
					Description = "Годуючі мами",
					GroupID = 2,
					ActionGetPath = "PermissionType/GetAllPermissions"
				},
				new ProductExistAttribute
				{
					Id = 5,
					Name = "adultsId",
					Description = "Дорослі",
					GroupID = 2,
					ActionGetPath = "PermissionType/GetAllPermissions"
				},
				new ProductExistAttribute
				{
					Id = 6,
					Name = "pregnantId",
					Description = "Вагітні",
					GroupID = 2,
					ActionGetPath = "PermissionType/GetAllPermissions"
				},
				new ProductExistAttribute
				{
					Id = 7,
					Name = "childrenId",
					Description = "Діти",
					GroupID = 2,
					ActionGetPath = "PermissionType/GetAllPermissions"
				},
				new ProductExistAttribute
				{
					Id = 8,
					Name = "driversId",
					Description = "Водії",
					GroupID = 2,
					ActionGetPath = "PermissionType/GetAllPermissions"
				}
				);
		}
	}
}
