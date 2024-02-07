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
	public class SimilarItemConfiguration : IEntityTypeConfiguration<SimilarProductItem>
	{
		public void Configure(EntityTypeBuilder<SimilarProductItem> builder)
		{
			builder.HasData(
				new SimilarProductItem { Id = 1, ProductID = 1, Title = "Апельсин", SimilarProductGroupID = 1 },
				new SimilarProductItem { Id = 2, ProductID = 2, Title = "Манго", SimilarProductGroupID = 1 },
				new SimilarProductItem { Id = 3, ProductID = 3, Title = "Полуниця", SimilarProductGroupID = 1 },
				new SimilarProductItem { Id = 4, ProductID = 4, Title = "Тутті-фруті", SimilarProductGroupID = 1 }
				);

		}
	}
}
