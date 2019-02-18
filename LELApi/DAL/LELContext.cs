using LELApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LELApi.DAL
{
    public class LELContext : DbContext
    {
        public LELContext(DbContextOptions<LELContext> options)
          : base(options)
        {

        }

        public LELContext() : base()
        {

        }

        public DbSet<LELProject> LELProject { get; set; }
        public DbSet<Symbol> Symbol { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Synonym> Synonym { get; set; }
        //public DbSet<SymbolComment> Comment { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<SymbolLike> SymbolLike { get; set; }
        public DbSet<Notion> Notion { get; set;}
        public DbSet<BehaviouralResponse> BehaviouralResponse { get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LelProjectTeam>()
                .HasKey(t => new { t.LelProjectId, t.UserId });

            modelBuilder.Entity<SymbolLike>()
            .HasOne(p => p.Symbol)
            .WithMany(b => b.SymbolLikes);

            modelBuilder.Entity<SymbolComment>()
            .HasOne(p => p.Symbol)
            .WithMany(b => b.Comments);

            modelBuilder.Entity<SymbolComment>()
            .HasOne(p => p.SymbolCommentReply)
            .WithMany(b => b.SymbolComments);
        }
    }
}
