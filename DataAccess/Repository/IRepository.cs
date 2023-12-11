﻿using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository.IRepository
{
	public interface IRepository<T> where T : BaseEntity
	{
		IEnumerable<T> GetAll();
		T? Get(int? Id);
		void Insert(T entity);
		void Update(T entity);
		void Delete(T entity);
		void Remove(T entity);
		void SaveChanges();
	}
}
