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
    public class LELProjectController : GenericApiController<LELProject, long>
    {
        public LELProjectController(LELContext context) : base(context) { }
        protected override DbSet<LELProject> EntityCollection { get { return this._context.LELProject; } }       

        [Route("api/lelproject/{id:long}/symbols")]
        [HttpGet("{id}")]
        public IEnumerable<Symbol> GetLELProjectSymbols(long id) {
            var project = this._context.LELProject.FirstOrDefault(aProject => aProject.Id == id);
            if (project != null) {
                return project.Symbols.ToList();
            }
            return new List<Symbol>();
        }

        public override void Map(LELProject entity){
            if (entity.AuthorId > 0){
                entity.Author = this._context.User.FirstOrDefault(user => user.Id == entity.AuthorId);
            }
        }
    }
}
