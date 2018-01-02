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
    [Route("api/[controller]")]
    public class GenericApiController<TEntity, TId> : Controller
    where TEntity : class
    {
        protected readonly LELContext _context;

        protected virtual DbSet<TEntity> EntityCollection { get; }

        public GenericApiController(LELContext context)
        {
            _context = context;
        }

        [HttpGet]
        public virtual IEnumerable<TEntity> Get()
        {
            return EntityCollection.ToList();
        }

        [HttpGet("{id}")]
        public virtual IActionResult Get(TId id)
        {
            var item = EntityCollection.FirstOrDefault(t => ((IEntity<TId>)t).Id.Equals(id));
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPut("{id}")]
        public virtual IActionResult Update(long id, [FromBody] TEntity entity)
        {
            if (entity == null || !((IEntity<TId>)entity).Id.Equals(id))
            {
                return BadRequest();
            }
            this.Map(entity);
            var dbEntity = EntityCollection.FirstOrDefault(t => ((IEntity<TId>)t).Id.Equals(id));
            
            if (dbEntity == null)
            {
                return NotFound();
            }

            _context.Entry(dbEntity).CurrentValues.SetValues(entity);
            _context.SaveChanges();
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public virtual void Delete(int id)
        {
        }

        [HttpPost]
        public virtual IActionResult Create([FromBody] TEntity item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            EntityCollection.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetEntity", new { id = ((IEntity<TId>)item).Id }, item);
        }

        public virtual void Map(TEntity entity){
            
        }
    }
}