using DataAccess.Migrations;
using Domain.Models;
using Domain.Models.ViewModels;
using Repository.Repository.Interfaces;
using Services.SimilarProductGroupService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Services.SimilarProductItemService
{
	public class SimilarProductItemService : ISimilarProductItemService
	{
		private IRepository<SimilarProductItem> _repository;
		public SimilarProductItemService(IRepository<SimilarProductItem> repository)
		{
			_repository = repository;
		}


		public void DeleteSimilarProductItem(int itemId)
		{
			SimilarProductItem? item = _repository.Get(x => x.Id == itemId);
			_repository.Remove(item);
			_repository.SaveChanges();

		}

		public IEnumerable<SimilarProductItem> GetAllSimilarSimilarProductItems(Expression<Func<SimilarProductItem, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public SimilarProductItem? GetSimilarProductItem(Expression<Func<SimilarProductItem, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}


		public void InsertSimilarProductItem(SimilarProductItem similarProductItem)
		{
			_repository.Insert(similarProductItem);
		}

		public void UpdateSimilarProductItem(SimilarProductItem similarProductItem)
		{
			_repository.Update(similarProductItem);
		}
	}
}
