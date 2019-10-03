using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BLL
{
    public class GameBLL
    {
        private readonly GameDataContext _db;
        public GameBLL(GameDataContext _db)
        {
            this._db = _db;
        }

        public Response Create(Game game)
        {
            var resp = new Response();
            try
            {
                _db.Add(game);
                _db.SaveChanges();
                resp.status = true;
                resp.data = game;
                return resp;
            }
            catch (Exception e)
            {
                resp.message = e.Message;
                return resp;
            }
        }

        public Response Get(long id)
        {
            var resp = new Response();
            try
            {
                var game = _db.Games
                                .Include(c => c.Players)
                                .Include(i => i.Rounds)
                                .FirstOrDefault(g => g.GameID == id);
                if( game != null)
                    resp.status = true;
                resp.data = game;
            }
            catch (Exception e)
            {
                resp.message = e.Message; 
            }
            return resp;
        }

        public Response GetRounds(long id)
        {
            var resp = new Response();
            try
            {
                var game = from d in _db.Round.Include(r => r.Player)
                           where d.GamedID == id 
                           select d;

                if (game != null)
                    resp.status = true;
                resp.data = game;
            }
            catch (Exception e)
            {
                resp.message = e.Message;
            }
            return resp;
        }

        public Response GetMove()
        {
            var resp = new Response();
            try
            {
                resp.data = _db.Moves.ToList();
                resp.status = true;
                return resp;
            }
            catch (Exception e)
            {
                resp.message = e.Message;
                return resp;
            }
        }
    }
}
