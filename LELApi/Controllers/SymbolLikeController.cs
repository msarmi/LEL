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
    public class SymbolLikeController : GenericApiController<SymbolLike, long>
    {
        public SymbolLikeController(LELContext context) : base(context) { }

        [HttpPost("api/[controller]")]
        public override IActionResult Create([FromBody] SymbolLike entity)
        {
            if (entity == null)
            {
                return BadRequest();
            }
            this.MapOnCreate(entity);
            var previousLikeDislike  = _context.Set<SymbolLike>().FirstOrDefault( ldl => ldl.AuthorId == entity.AuthorId && ldl.SymbolId == entity.SymbolId);
            if (previousLikeDislike != null) {
                previousLikeDislike.IsLike = entity.IsLike;                 
                _context.Update(previousLikeDislike);
            }
            else {
                _context.Set<SymbolLike>().Add(entity);
            }
            _context.SaveChanges();

            return new ObjectResult(entity);
        }

    }
}
