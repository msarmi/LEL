namespace LELApi.Models
{
    public class SymbolLike : IEntity<long>
    {
        public long Id { get; set; }
        public long SymbolId { get; set; }
        public virtual Symbol Symbol { get; set; }
        public long AuthorId { get; set; }
        public virtual User Author { get; set; }
        public virtual bool IsLike { get; set; }
    }
}