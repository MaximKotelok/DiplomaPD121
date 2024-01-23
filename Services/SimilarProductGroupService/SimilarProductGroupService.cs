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

namespace Services.SimilarProductGroupService
{
	public class SimilarProductGroupService : ISimilarProductGroupService
	{
		private IRepository<SimilarProductGroup> _repository;
		public SimilarProductGroupService(IRepository<SimilarProductGroup> repository)
		{
			_repository = repository;
		}

		public void DeleteSimilarProductGroup(int id)
		{
			SimilarProductGroup? group = _repository.Get(x => x.Id == id);
			_repository.Remove(group);
			_repository.SaveChanges();
		}
		
		public IEnumerable<SimilarProductGroup> GetAllSimilarProductGroups(Expression<Func<SimilarProductGroup, bool>>? filter = null, string? includeProperties = null)
		{
			return _repository.GetAll(filter, includeProperties);
		}

		public SimilarProductGroup? GetSimilarProductGroup(Expression<Func<SimilarProductGroup, bool>> filter, string? includeProperties = null)
		{
			return _repository.Get(filter, includeProperties);
		}

		public void InsertSimilarProductGroup(SimilarProductGroup similarProductGroup)
		{
			_repository.Insert(similarProductGroup);
		}

		public void UpdateSimilarProductGroup(SimilarProductGroup similarProductGroup)
		{
			_repository.Update(similarProductGroup);
		}


	}
}
