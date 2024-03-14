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
	public class ProductPropertyConfiguration : IEntityTypeConfiguration<ProductProperty>
	{
		public void Configure(EntityTypeBuilder<ProductProperty> builder)
		{
			builder.HasKey(table => new
			{
				table.ProductID,
				table.AttributeID
			});

			builder.HasData(
				new ProductProperty { AttributeID = 30, ProductID = 5, Value = "3 роки" },
				new ProductProperty { AttributeID = 30, ProductID = 6, Value = "3 роки" },
				new ProductProperty { AttributeID = 32, ProductID = 7, Value = "Білий" },
				new ProductProperty { AttributeID = 32, ProductID = 8, Value = "Чорний" },
				new ProductProperty { AttributeID = 38, ProductID = 7, Value = "1.5 л" },
				new ProductProperty { AttributeID = 38, ProductID = 8, Value = "2 л" }
				);
			builder.HasData(
		new ProductProperty { AttributeID = 33, ProductID = 7, Value = "Незначна" },
		new ProductProperty { AttributeID = 20, ProductID = 7, Value = "Медичний" },
		new ProductProperty { AttributeID = 20, ProductID = 8, Value = "Медичний" },
		new ProductProperty { AttributeID = 46, ProductID = 8, Value = "24 місяці" }
	);
			builder.HasData(
	   new ProductProperty { AttributeID = 5, ProductID = 9, Value = "Додаткові функції для першої допомоги" },
	   new ProductProperty { AttributeID = 5, ProductID = 10, Value = "Одноразова" },
	   new ProductProperty { AttributeID = 21, ProductID = 9, Value = "Білий" },
	   new ProductProperty { AttributeID = 21, ProductID = 10, Value = "Синій" },
	   new ProductProperty { AttributeID = 49, ProductID = 10, Value = "5 мл" },
	   new ProductProperty { AttributeID = 50, ProductID = 10, Value = "Не потребує калібрування" }
   );
			builder.HasData(
		new ProductProperty { AttributeID = 47, ProductID = 11, Value = "Лікування грипу" },
		new ProductProperty { AttributeID = 47, ProductID = 12, Value = "Імунітет" },
		new ProductProperty { AttributeID = 13, ProductID = 11, Value = "Для дорослих" },
		new ProductProperty { AttributeID = 13, ProductID = 12, Value = "Для всієї родини" },
		new ProductProperty { AttributeID = 50, ProductID = 11, Value = "Не потребує калібрування" },
		new ProductProperty { AttributeID = 50, ProductID = 12, Value = "Не потребує калібрування" }
	);

		}
	}
}
