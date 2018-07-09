using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.Models
{
    public class Synonym : IEntity<long>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long SymbolId { get; set; }
        public virtual Symbol Symbol { get; set; }
    }
}
