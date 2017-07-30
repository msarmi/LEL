using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.Models
{
    public class Role : IEntity<string>
    {
        public string Id { get; set; }
        public string Description { get; set; }
    }
}