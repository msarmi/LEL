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
        protected override DbSet<LELProject> EntityCollection { get { return this._context.LELProjects; } }        
    }
}
