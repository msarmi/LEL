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
        public Symbol()
        {
            Synonyms = new List<Synonym>();
            Notions = new List<Notion>();
            BehaviouralResponses = new List<BehaviouralResponse>();
            Comments = new List<SymbolComment>();
            SymbolLikes = new List<SymbolLike>();            
        }
        public long Id { get; set; }
        public string Name { get; set; }
        public long AuthorId { get; set; }
        public virtual User Author { get; set; }        

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
        public virtual ICollection<Notion> Notions { get; set; }
        public virtual ICollection<BehaviouralResponse> BehaviouralResponses { get; set; }
        public virtual ICollection<SymbolComment> Comments { get; set; }
        public virtual ICollection<SymbolLike> SymbolLikes { get; set; }
        public virtual int Likes { get { return SymbolLikes.Where(like => like.IsLike).Count(); } }
        public virtual int Dislikes { get { return SymbolLikes.Where(like => !like.IsLike).Count(); } }

        // 	public Symbol merge(Symbol anotherSymbol)
        // 	{
        // 		return null;
        // 	}
    }
}
