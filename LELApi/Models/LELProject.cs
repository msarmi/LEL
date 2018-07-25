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
        public virtual User Author { get; set; }
        public virtual ICollection<LelProjectTeam> Team {get; set;}

        public virtual ICollection<Symbol> Symbols { get; set; }    
    }
}
