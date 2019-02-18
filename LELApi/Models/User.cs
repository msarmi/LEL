using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace LELApi.Models
{
    public class User : IEntity<long>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public Role Role { get; set; }
        public string Email { get; set; }
        public virtual ICollection<SymbolComment> Comments { get; set; }        
        [NotMapped]
        public virtual string Password { get; set; }
        public virtual byte[] PasswordHash { get; set; }
        public virtual byte[] PasswordSalt { get; set; }
        //public virtual ICollection<SymbolLike> SymbolLikes { get; set; }
    }
}
