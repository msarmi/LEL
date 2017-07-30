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
    public class RoleController : GenericApiController<Role, long>
    {
        public RoleController(LELContext context) : base(context) { }
        protected override DbSet<Role> EntityCollection { get { return this._context.Roles; } }        
    }
}
