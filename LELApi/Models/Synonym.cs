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
		public string Description { get; set; }
		public long SymbolId { get; set; }
		public Symbol Symbol { get; set; }
	}
}
