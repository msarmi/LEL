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
    public class LELProjectController : GenericApiController<LELProject, long>
    {
        public LELProjectController(LELContext context) : base(context) { }        

        [Route("api/[controller]/{id}/symbols")]        
        public IEnumerable<Symbol> GetLELProjectSymbols(long id) {
            var project = this._context.Set<LELProject>()
            .Include(aProject => aProject.Symbols)
            .ThenInclude(aProject => aProject.Synonyms).FirstOrDefault(aProject => aProject.Id == id);
            if (project != null) {
                return project.Symbols;
            }
            return null;
        }

        /*public override void Map(LELProject entity){
            if (entity.AuthorId > 0){
                entity.Author = this._context.Set<User>().FirstOrDefault(user => user.Id == entity.AuthorId);
            }
        }*/
    }
}
