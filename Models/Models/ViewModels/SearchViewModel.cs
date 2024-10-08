﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility;

namespace Domain.Models.ViewModels
{
	public class SearchViewModel
	{
		public string? Title { get; set; } = null;
		public string? OrderBy { get; set; } = SD.ByDefault;
		public int[]? Categories { get; set; } = null;
		public int[]? Brands { get; set; } = null;
		public int? ActiveSubstanceId { get; set; } = null;
		public int ItemsPerPage { get; set; } = 8;
		public int? Page { get; set; } = null;
		public PropertySearchViewModel[]? Properties { get; set; } = null;

	}

	public class PropertySearchViewModel
	{
		public string? Name { get; set; }
		public string? Value { get; set; }
	}



}
