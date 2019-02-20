using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LELApi.DAL;
using LELApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
namespace LELApi.Controllers
{
    public class SymbolController : GenericApiController<Symbol, long>
    {
        public SymbolController(LELContext context) : base(context) { }
        //protected override DbSet<Symbol> EntityCollection { get { return _context.Symbol; } }       
        
        [HttpGet("api/[controller]/{id}")]
        public override IActionResult Get(long id)
        {
            var entity = _context.Set<Symbol>()
                .Include(sym => sym.Synonyms)
                .Include(sym => sym.BehaviouralResponses)
                .Include(sym => sym.Notions)
                .Include(sym => sym.Comments)
                .Include(sym => sym.SymbolLikes)
                .FirstOrDefault(t => t.Id.Equals(id));
            if (entity == null)
            {
                return NotFound();
            }
            return new ObjectResult(entity);
        }

        [HttpGet("api/[controller]/{id}/comments")]
        public IActionResult GetComments(long id)
        {
           var entity = _context.Set<Symbol>()
                .Include(symbol => symbol.Comments)
                    .ThenInclude(comment => comment.User)
                .Include(symbol => symbol.Comments)
                    .ThenInclude(comment => comment.SymbolComments)
                        .ThenInclude(comment => comment.User)
                .FirstOrDefault(t => t.Id.Equals(id));
            if (entity == null)
            {
                return NotFound();
            }
            return new ObjectResult(entity.Comments);
        }

        [HttpPost("api/[controller]/{id}/comments")]
        public IActionResult SetComments([FromRoute] long id, [FromBody] List<SymbolComment> comments)
        {
            foreach (var comment in comments)
            {
                foreach (var reply in comment.SymbolComments)
                {
                    if (reply.Id == 0)
                    {
                        reply.SymbolCommentId = comment.Id;      
                    }                    
                }                
            }
            _context.Set<SymbolComment>().UpdateRange(comments);
            _context.SaveChanges();
            return Ok(_context.Symbol.First(sym => sym.Id.Equals(id)).Comments);
            // if (id == 0)
            //     return NotFound();            
            // var symbol = _context.Symbol.First(sym => sym.Id.Equals(id));            
            // symbol.Comments = comments;
            // _context.Set<SymbolComment>().RemoveRange(symbol.Comments.Where(comment => !comments.Any(x => x.Id == comment.Id)));
            // _context.SaveChanges();
            // return Ok(symbol.Comments);
        }

        public override void MapOnCreate(Symbol entity)
        {
            // this is necessary because the symbol doesn't have an id yet.
            foreach (Synonym syn in entity.Synonyms)
            {
                syn.Symbol = entity;
            }
            foreach (BehaviouralResponse act in entity.BehaviouralResponses)
            {
                act.Symbol = entity;
            }
            foreach (Notion notion in entity.Notions)
            {
                notion.Symbol = entity;
            }
            foreach (SymbolComment comment in entity.Comments)
            {
                comment.Symbol = entity;
            }
        }

        public override Symbol MapOnUpdate(Symbol entityWithNewValues)
        {
            var symbolDb = _context.Set<Symbol>()
                .Include(sym => sym.Synonyms)
                .Include(sym => sym.BehaviouralResponses)
                .Include(sym => sym.Notions)
                .Include(sym => sym.Comments)
                .Include(sym => sym.SymbolLikes)
                .FirstOrDefault(s => s.Id == entityWithNewValues.Id);
            _context.Set<Synonym>().RemoveRange(symbolDb.Synonyms.Where(syn => !entityWithNewValues.Synonyms.Any(x => x.Id == syn.Id)));
            _context.Set<Notion>().RemoveRange(symbolDb.Notions.Where(noti => !entityWithNewValues.Notions.Any(x => x.Id == noti.Id)));
            _context.Set<BehaviouralResponse>().RemoveRange(symbolDb.BehaviouralResponses.Where(br => !entityWithNewValues.BehaviouralResponses.Any(x => x.Id == br.Id)));
            _context.Set<SymbolComment>().RemoveRange(symbolDb.Comments.Where(comment => !entityWithNewValues.Comments.Any(x => x.Id == comment.Id)));
            symbolDb.Name = entityWithNewValues.Name;
            symbolDb.Category = entityWithNewValues.Category;
            foreach (Synonym syn in entityWithNewValues.Synonyms)
            {
                if (syn.Id == 0)
                {
                    symbolDb.Synonyms.Add(syn);
                    syn.Symbol = symbolDb;
                }
            }
            foreach (BehaviouralResponse br in entityWithNewValues.BehaviouralResponses)
            {
                if (br.Id == 0)
                {
                    symbolDb.BehaviouralResponses.Add(br);
                    br.Symbol = symbolDb;
                }
            }
            foreach (Notion noti in entityWithNewValues.Notions)
            {
                if (noti.Id == 0)
                {
                    symbolDb.Notions.Add(noti);
                    noti.Symbol = symbolDb;
                }
            }
            foreach (SymbolComment comment in entityWithNewValues.Comments)
            {
                if (comment.Id == 0)
                {
                    symbolDb.Comments.Add(comment);
                    comment.Symbol = symbolDb;
                }
            }
            return symbolDb;
        }

        [HttpPost("api/[controller]/merge")]
        public IActionResult Merge([FromBody] MergeSymbolsData mergeSymbolsData)
        {
            var symbol1 = _context.Set<Symbol>()
                .Include(sym => sym.Synonyms)
                .Include(sym => sym.BehaviouralResponses)
                .Include(sym => sym.Notions)
                .Include(sym => sym.Comments)
                    .ThenInclude(comment => comment.SymbolComments)
                .Include(sym => sym.SymbolLikes)
                .FirstOrDefault(s => s.Id == mergeSymbolsData.Symbol1Id);
            var symbol2 = _context.Set<Symbol>()
                .Include(sym => sym.Synonyms)
                .Include(sym => sym.BehaviouralResponses)
                .Include(sym => sym.Notions)
                .Include(sym => sym.Comments)
                    .ThenInclude(comment => comment.SymbolComments)
                .Include(sym => sym.SymbolLikes)
                .FirstOrDefault(s => s.Id == mergeSymbolsData.Symbol2Id);
            var newMergedSymbol = new Symbol();
            newMergedSymbol.Name = mergeSymbolsData.Name;
            newMergedSymbol.Category = symbol1.Category;                        
            newMergedSymbol.LELProjectId = symbol1.LELProjectId;
            newMergedSymbol.AuthorId = mergeSymbolsData.AuthorId;
            foreach (var bh in symbol1.BehaviouralResponses)
            {
                BehaviouralResponse newBh = new BehaviouralResponse();
                newBh.AuthorId = bh.AuthorId;
                newBh.Expression = bh.Expression;
                newBh.Symbol = newMergedSymbol;
                newMergedSymbol.BehaviouralResponses.Add(newBh);
            }
            foreach (var bh in symbol2.BehaviouralResponses)
            {
                if (!newMergedSymbol.BehaviouralResponses.Any(b => bh.Expression == b.Expression))
                {
                    BehaviouralResponse newBh = new BehaviouralResponse();
                    newBh.AuthorId = bh.AuthorId;
                    newBh.Expression = bh.Expression;
                    newBh.Symbol = newMergedSymbol;
                    newMergedSymbol.BehaviouralResponses.Add(newBh);                    
                }
               
            }
            foreach (var comment in symbol1.Comments.Where(c => c.SymbolId > 0))
            {
                SymbolComment newComment = new SymbolComment();
                newComment.UserId = comment.UserId;
                newComment.Content = comment.Content;                
                newComment.Symbol = newMergedSymbol;
                foreach (var reply in symbol1.Comments.Where(c => c.SymbolCommentId == comment.Id))
                {
                    SymbolComment newReply = new SymbolComment();
                    newReply.UserId = reply.UserId;
                    newReply.Content = reply.Content;
                    newReply.SymbolCommentReply = reply.SymbolCommentReply;
                    newReply.SymbolComments.Add(newReply);
                }
                newMergedSymbol.Comments.Add(newComment);
            }
            foreach (var comment in symbol2.Comments.Where(c => c.SymbolId > 0))
            {
                if (!newMergedSymbol.Comments.Any(c => c.Content == comment.Content))
                {
                    SymbolComment newComment = new SymbolComment();
                    newComment.UserId = comment.UserId;
                    newComment.Content = comment.Content;                
                    newComment.Symbol = newMergedSymbol;
                    foreach (var reply in symbol2.Comments.Where(c => c.SymbolCommentId == comment.Id))
                    {
                        SymbolComment newReply = new SymbolComment();
                        newReply.UserId = reply.UserId;
                        newReply.Content = reply.Content;
                        newReply.SymbolCommentReply = reply.SymbolCommentReply;
                        newReply.SymbolComments.Add(newReply);
                    }
                    newMergedSymbol.Comments.Add(newComment);   
                }                
            }
            foreach (var notion in symbol1.Notions)
            {
                Notion newNotion = new Notion();
                newNotion.AuthorId = notion.AuthorId;
                newNotion.Symbol = newMergedSymbol;
                newNotion.Expression = notion.Expression;
                newMergedSymbol.Notions.Add(newNotion);
            }
            foreach (var notion in symbol2.Notions)
            {
                if (!newMergedSymbol.Notions.Any(n => n.Expression == notion.Expression))
                {
                    Notion newNotion = new Notion();
                    newNotion.AuthorId = notion.AuthorId;
                    newNotion.Symbol = newMergedSymbol;
                    newNotion.Expression = notion.Expression;
                    newMergedSymbol.Notions.Add(newNotion);   
                }                
            }
            
            foreach (var symbolLike in symbol1.SymbolLikes)
            {
                SymbolLike newLike = new SymbolLike();                
                newLike.AuthorId = symbolLike.AuthorId;
                newLike.IsLike = symbolLike.IsLike;
                newLike.Symbol = newMergedSymbol;
                newMergedSymbol.SymbolLikes.Add(newLike);
            }
            foreach (var symbolLike in symbol2.SymbolLikes)
            {
                if (!newMergedSymbol.SymbolLikes.Any(sl => sl.AuthorId == symbolLike.AuthorId))
                {
                    SymbolLike newLike = new SymbolLike();                    
                    newLike.AuthorId = symbolLike.AuthorId;
                    newLike.IsLike = symbolLike.IsLike;
                    newLike.Symbol = newMergedSymbol;
                    newMergedSymbol.SymbolLikes.Add(newLike);   
                }                
            } 

            foreach (var synonym in symbol1.Synonyms)
            {
                Synonym syn = new Synonym();                
                syn.Name = syn.Name;
                syn.Symbol = synonym.Symbol;
                newMergedSymbol.Synonyms.Add(syn);
            }
            foreach (var synonym in symbol2.Synonyms)
            {
                if (!newMergedSymbol.Synonyms.Any(sl => sl.Name == synonym.Name))
                {
                    Synonym syn = new Synonym();                
                    syn.Name = syn.Name;
                    syn.Symbol = synonym.Symbol;
                    newMergedSymbol.Synonyms.Add(syn);
                }                
            } 

            _context.Symbol.Remove(symbol1);
            _context.Symbol.Remove(symbol2);
            _context.Symbol.Add(newMergedSymbol);
            _context.SaveChanges();
            string pattern1 = "({.*?"+ mergeSymbolsData.Symbol1Id.ToString() +".*?})";
            string pattern2 = "({.*?"+ mergeSymbolsData.Symbol2Id.ToString() +".*?})";
            foreach (var notion in _context.Notion)
            {
                if (Regex.IsMatch(notion.Expression,pattern1))
                {
                    notion.Expression.Replace(mergeSymbolsData.Symbol1Id.ToString(), newMergedSymbol.Id.ToString());
                }
                if (Regex.IsMatch(notion.Expression,pattern2))
                {
                    notion.Expression.Replace(mergeSymbolsData.Symbol2Id.ToString(), newMergedSymbol.Id.ToString());
                }
            }
            foreach (var behaviouralResponse in _context.BehaviouralResponse)
            {
                if (Regex.IsMatch(behaviouralResponse.Expression,pattern1))
                {
                    behaviouralResponse.Expression.Replace(mergeSymbolsData.Symbol1Id.ToString(), newMergedSymbol.Id.ToString());
                }
                if (Regex.IsMatch(behaviouralResponse.Expression,pattern2))
                {
                    behaviouralResponse.Expression.Replace(mergeSymbolsData.Symbol2Id.ToString(), newMergedSymbol.Id.ToString());
                }
            }
            _context.SaveChanges();
            return Ok();
        }
    }
}
