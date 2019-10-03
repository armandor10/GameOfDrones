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
    public class Round_UT
    {
        private RoundBLL roundBLL;

        [SetUp]
        public void Setup()
        {
            var connectionString = "Server=(localdb)\\mssqllocaldb;Database=RPSGame;Trusted_Connection=True;";
            var optionsBuilder = new DbContextOptionsBuilder<GameDataContext>();
            optionsBuilder.UseSqlServer(connectionString);
            var db = new GameDataContext(optionsBuilder.Options);
            roundBLL = new RoundBLL(db);
        }

        [Test]
        public void CreateRound_UT()
        {
            var round = new Round();
            round.GamedID = 1;
            round.PlayerID = 1;
            var noExpected = 0;
            var game1 = (Round) roundBLL.Create(round).data;
            Assert.AreNotEqual(noExpected, game1.RoundID);
        }

        [Test]
        public void GetGame_UT()
        {
            int id = 18;
            var expected = "diego";
            var game = (Round) roundBLL.Get(id).data;
            Assert.AreEqual(expected, game.Player.Name);
        }


    }
}
