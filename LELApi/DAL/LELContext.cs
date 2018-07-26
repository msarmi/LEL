﻿using LELApi.Models;
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
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Role> Role { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LelProjectTeam>()
                .HasKey(t => new { t.LelProjectId, t.UserId });
        }
    }
}
