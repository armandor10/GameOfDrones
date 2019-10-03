using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using DTO;
using System.Linq;

namespace DAL
{
    public class GameDataContext: DbContext
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Round> Round { get; set; }
        public DbSet<Move> Moves
        {
            get; set;
        }
        public GameDataContext(DbContextOptions<GameDataContext> options): base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Move>()
                .HasData(new Move { IdMove = 1, name = "Rock" }, 
                         new Move { IdMove = 2, name = "Paper" },
                         new Move { IdMove = 3, name = "Scissors" });
        }

    }
}
