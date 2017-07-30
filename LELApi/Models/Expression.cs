using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.Models
{
	public class Expression : IEntity<long>
	{
		public long Id { get; set; }
		public string Content { get; set; }
		public virtual ICollection<ExpressionSymbol> ContentSymbols { get; set; }
		public virtual ICollection<NotionExpression> NotionSymbols { get; set; }
		public virtual ICollection<ActionExpression> ActionSymbols { get; set; }
		
		public long AuthorId { get; set; }		
		public User Author { get; set; }		
	}
}
