using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.Models
{
    public class User : IEntity<long>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Alias { get; set; }
        public Role Role { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
