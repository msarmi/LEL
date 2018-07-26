using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.Models
{
    public class LelProjectTeam
    {
        public long LelProjectId { get; set; }
        public LELProject LelProject { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }
        public bool IsAdmin { get; set; }
    }
}
