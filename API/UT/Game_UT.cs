using BLL;
using DAL;
using DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using System.Linq;
using System.Collections.Generic;

namespace Tests
{
    public class Tests
    {
        //private readonly IConfiguration config = new ConfigurationBuilder()
        //                                                .AddJsonFile("config.json")
        //                                                .Build();
        private GameBLL gameBLL;

        [SetUp]
        public void Setup()
        {
            var connectionString = "Server=(localdb)\\mssqllocaldb;Database=RPSGame;Trusted_Connection=True;";
            var optionsBuilder = new DbContextOptionsBuilder<GameDataContext>();
            optionsBuilder.UseSqlServer(connectionString);
            var db = new GameDataContext(optionsBuilder.Options);
            gameBLL = new GameBLL(db);
        }

        [Test]
        public void CreateGame_UT()
        {
            var game = new Game();
            game.Players = new List<Player> {
                new Player
                {
                    Name = "Juan"
                },
                new Player
                {
                    Name = "Armando"
                }
            };
            var noExpected = 0;
            var game1 = (Game)gameBLL.Create(game).data;
            Assert.AreNotEqual(noExpected, game1.GameID);
        }

        [Test]
        public void GetGame_UT()
        {
            long gameID = 10;
            var playerExpected = "Juan";
            var game = (Game)gameBLL.Get(gameID).data;
            Assert.AreEqual(playerExpected, game.Players.FirstOrDefault().Name);
        }

        [Test]
        public void GetGameRounds_UT()
        {
            long gameID = 10;
            var obj = (IQueryable<Round>)gameBLL.GetRounds(gameID).data;
            Assert.Zero(obj.Count());
        }

    }
}