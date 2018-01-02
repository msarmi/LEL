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
    public class CommentController : GenericApiController<Comment, long>
    {
        public CommentController(LELContext context) : base(context) { }
        protected override DbSet<Comment> EntityCollection { get { return this._context.Comment; } }

        // [HttpGet]
        // public override IEnumerable<Comment> Get()
        // {
        //     return this._context.Comments.Include(c => c.Author).ToList();
        // }
    }
}
