using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.Models
{
    public class Notion : IEntity<long>
    {
        public long Id { get; set; }
        public long SymbolId { get; set; }
        public virtual Symbol Symbol { get; set; }

        public long AuthorId { get; set; }
        public virtual User Author { get; set; }

        public string Expression { get; set; }
    }
}
