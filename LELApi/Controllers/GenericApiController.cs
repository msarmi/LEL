using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LELApi.DAL;
using LELApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace LELApi.Controllers
{
    [Authorize]
    public class GenericApiController<TEntity, TId> : Controller
    where TEntity : class
    {
        protected readonly LELContext _context;

        public GenericApiController(LELContext context)
        {
            _context = context;
        }

        [HttpGet("api/[controller]")]
        public virtual IEnumerable<TEntity> Get()
        {
            return _context.Set<TEntity>().ToList();
        }

        [HttpGet("api/[controller]/{id}")]
        public virtual IActionResult Get(TId id)
        {
            var entity = _context.Set<TEntity>().FirstOrDefault(t => ((IEntity<TId>)t).Id.Equals(id));
            if (entity == null)
            {
                return NotFound();
            }
            return new ObjectResult(entity);
        }

        [HttpPut("api/[controller]/{id}")]
        public virtual IActionResult Update(long id, [FromBody] TEntity entity)
        {
            if (entity == null || !((IEntity<TId>)entity).Id.Equals(id))
            {
                return BadRequest();
            }
            
            TEntity dbEntityMapped = this.MapOnUpdate(entity);

            _context.Update(dbEntityMapped);
            _context.SaveChanges();
            return new ObjectResult(dbEntityMapped);
        }

        [HttpDelete("api/[controller]/{id}")]
        public virtual void Delete(int id)
        {
        }

        [HttpPost("api/[controller]")]
        public virtual IActionResult Create([FromBody] TEntity entity)
        {
            if (entity == null)
            {
                return BadRequest();
            }
            this.MapOnCreate(entity);            
            _context.Set<TEntity>().Add(entity);
            _context.SaveChanges();

            return new ObjectResult(entity);
        }

        public virtual void MapOnCreate(TEntity entity){
            
        }

        public virtual TEntity MapOnUpdate(TEntity entityWithNewValues){
            return entityWithNewValues;
        }
    }
}