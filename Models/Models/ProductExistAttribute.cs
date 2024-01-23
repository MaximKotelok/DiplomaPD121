using Lab.Domain.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain.Models
{
	public class ProductExistAttribute:BaseEntity
	{
		public int? GroupID { get; set; }	
		[JsonIgnore]
		[ForeignKey(nameof(GroupID))]
		public ProductAttributeGroup? AttributeGroup { get; set; }
		public string? Name { get; set; }
		public string? Description { get; set; }
		public string? ActionGetPath { get; set; }
	}
}