using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.Models
{
    public class LELProjectAdmin
    {
        public long LELProjectId { get; set; }
        public LELProject LELProject { get; set; }
        public long AdminId { get; set; }
        public User Admin { get; set; }
    }
}
