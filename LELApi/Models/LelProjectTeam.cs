using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.Models
{
    public class LelProjectTeam
    {
        public long Id { get; set; }
        public long LeLProjectId { get; set; }
        public LELProject LelProject { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }
        public bool IsAdmin { get; set; }
    }
}
