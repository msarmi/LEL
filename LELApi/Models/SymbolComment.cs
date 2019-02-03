using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.Models
{
    public class SymbolComment : IEntity<long>
    {
        public long Id { get; set; }

        public long? SymbolId { get; set; }

        public virtual Symbol Symbol { get; set; }

        public string Content { get; set; }

        public long UserId { get; set; }

        public virtual User User { get; set; }

        public long? SymbolCommentId { get; set; }

        public virtual SymbolComment SymbolCommentReply { get; set; }

        public virtual List<SymbolComment> SymbolComments{ get; set; }

        public SymbolComment()
        {
            this.SymbolComments = new List<SymbolComment>();
        }

    }
}
