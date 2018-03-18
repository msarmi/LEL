using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LELApi.DAL;
using LELApi.Models;
using Microsoft.EntityFrameworkCore;

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
                                 .FirstOrDefault(sym => sym.Id.Equals(id));
            if (entity == null)
            {
                return NotFound();
            }
            return new ObjectResult(entity);
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
        }

        public override Symbol MapOnUpdate(Symbol entityWithNewValues)
        {
            var symbolDb = _context.Set<Symbol>().Include(s => s.Synonyms).Include(sym => sym.BehaviouralResponses).Include(sym => sym.Notions).FirstOrDefault(s => s.Id == entityWithNewValues.Id);
            _context.Set<Synonym>().RemoveRange(symbolDb.Synonyms.Where(syn => !entityWithNewValues.Synonyms.Any(x => x.Id == syn.Id)));
           _context.Set<Notion>().RemoveRange(symbolDb.Notions.Where(noti => !entityWithNewValues.Notions.Any(x => x.Id == noti.Id)));
           _context.Set<BehaviouralResponse>().RemoveRange(symbolDb.BehaviouralResponses.Where(br => !entityWithNewValues.Notions.Any(x => x.Id == br.Id)));
            
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
            return symbolDb;
        }
    }
}
