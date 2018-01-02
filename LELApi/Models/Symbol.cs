using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.Models
{
    public class Symbol : IEntity<long>
    {
		public long Id { get; set; }
		public string Name { get; set; }				
		public long AuthorId { get; set;}		
		public virtual User Author { get; set; }
		//public virtual Category Category { get; set; }

    	public int UserId { get; set; }
 
		[Column("Category")]
		public string CategoryString
		{
			get
			{
				return this.Category.ToString();
			} 
	
			set
			{
				this.Category = Enum.Parse<Category>(value, true);
			}
		}
	
		[NotMapped]
		public Category Category { get; set; }

		public long LELProjectId { get; set; }
		public virtual LELProject LELProject { get; set; }
		public virtual ICollection<Synonym> Synonyms { get; set; }
		public virtual ICollection<NotionExpression> Notions { get; set; } 
		public virtual ICollection<ActionExpression> Actions { get; set; }
				
	// 	public Symbol merge(Symbol anotherSymbol)
	// 	{
	// 		return null;
	// 	}
	}
}
