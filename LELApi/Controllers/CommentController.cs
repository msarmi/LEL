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
    public class CommentController : GenericApiController<SymbolComment, long>
    {
        public CommentController(LELContext context) : base(context) { }
            
        [HttpGet("api/[controller]/{symbolId}")]
        public IActionResult GetComments(long symbolId)
        {
            var entity = _context.Set<Symbol>()
                .Include(symbol => symbol.Comments)
                .ThenInclude(comment => comment.SymbolComments)
                .FirstOrDefault(t => t.Id.Equals(symbolId));
            if (entity == null)
            {
                return NotFound();
            }
            return new ObjectResult(entity.Comments);
        }

        [HttpPost("api/[controller]/{symbolId}")]
        public IActionResult SetComments([FromRoute] long symbolId, [FromBody] List<SymbolComment> comments)
        {
            var entity = new Symbol();
            entity.Id = symbolId;
            entity.Comments = comments;
            _context.Update(entity);
            return Ok(entity.Comments);
        }
    }
}
