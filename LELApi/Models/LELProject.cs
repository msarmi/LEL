using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.Models
{
    public class LELProject : IEntity<long>
    {
		public long Id { get; set; }
		public string Name { get; set; }
		public long AuthorId { get; set; }		
		public User Author { get; set; }
		public ICollection<LELProjectAdmin> Admins { get; set; }
		public ICollection<Symbol> Symbols { get; set; }
     }
}
