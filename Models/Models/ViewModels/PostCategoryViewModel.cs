using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.ViewModels
{
    public class PostCategoryViewModel
    {
        public int? Id { get; set; }
        public string? Title { get; set; }
        public int? ParentCategoryID { get; set; }
        public bool? IsRecomended { get; set; }
        public string? PathToPhoto { get; set; }
        public string? PathToRecomendedPhoto { get; set; }

    }
}
