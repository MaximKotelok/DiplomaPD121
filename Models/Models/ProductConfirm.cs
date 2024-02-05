using Lab.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class ProductConfirm : BaseEntity
	{
		[Required]
		public int? PharmacompanyID { get; set; }
		[ForeignKey(nameof(PharmacompanyID))]
		public PharmaCompany? PharmaCompany { get; set; }
		public int? ProductID {  get; set; }
		public Product? Product { get; set; }
		[Required]
		public int? ProductStatusID { get; set; }
		[ForeignKey(nameof(ProductStatusID))]
		public ProductStatus? ProductStatus { get; set; }		

	}
}
