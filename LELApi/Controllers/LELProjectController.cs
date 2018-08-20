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
        public IEnumerable<Symbol> GetLELProjectSymbols(long id)
        {
            var project = this._context.Set<LELProject>()
            .Include(aProject => aProject.Symbols)
                .ThenInclude(aSymbol => aSymbol.Synonyms)
            .Include(aProject => aProject.Symbols)
                .ThenInclude(aSymbol => aSymbol.SymbolLikes)
            .FirstOrDefault(aSymbol => aSymbol.Id == id);
            if (project != null)
            {
                return project.Symbols;
            }
            return null;
        }

        [HttpGet("api/[controller]")]
        public override IEnumerable<LELProject> Get()
        {
            return _context.Set<LELProject>()
            .Include(aProject => aProject.Author)
            .ToList();
        }

        [Route("api/[controller]/{id}/team")]
        public IEnumerable<LelProjectTeam> GetLelProjectTeam(long id)
        {
            var project = this._context.Set<LELProject>()
            .Include(aProject => aProject.Team)
            .ThenInclude(teamEntry => teamEntry.User).FirstOrDefault(aTeam => aTeam.Id == id);
            if (project != null)
            {
                return project.Team;
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
