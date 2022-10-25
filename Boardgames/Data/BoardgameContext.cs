﻿using Boardgames.Data.Dtos.Auth;
using Boardgames.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Boardgames.Data
{
    public class BoardgameContext : IdentityDbContext<BoardgamesUser>
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Ad> Ads { get; set; }
        public DbSet<Question> Questions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // !!! DON'T STORE THE REAL CONNECTION STRING THE IN PUBLIC REPO !!!
            // Use secret managers provided by your chosen cloud provider
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=Boardgames");
        }
    }
}