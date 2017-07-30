using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.Models
{
    public class Comment : IEntity<long>
    {
		public long Id { get; set; }
		public string Content { get; set; }
		public long AuthorId { get; set; }		
		public virtual User Author { get; set; }
		//public ICollection<Comment> Replies { get; set; }

		//public Comment() {
		//	Replies = new HashSet<Comment>();
		//}
	}
}
