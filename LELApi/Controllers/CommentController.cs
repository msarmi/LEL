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
    public class CommentController : GenericApiController<Comment, long>
    {
        public CommentController(LELContext context) : base(context) { }
    }
}
