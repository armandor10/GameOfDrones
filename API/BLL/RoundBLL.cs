using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace BLL
{
    public class RoundBLL
    {
        private readonly GameDataContext _db;

        public RoundBLL(GameDataContext _db)
        {
            this._db = _db;
        }
        public Response Create(Round round)
        {
            var resp = new Response();
            try
            {
                _db.Add(round);
                _db.SaveChanges();
                resp.status = true;
                resp.data = round;
                return resp;
            }
            catch (Exception e)
            {
                resp.message = e.Message;
                return resp;
            }
        }

        public Response Get(int id)
        {
            var resp = new Response();
            try
            {
                var round = _db.Round.Include(r => r.Player).FirstOrDefault(g => g.RoundID == id);
                if (round != null)
                    resp.status = true;
                resp.data = round;
            }
            catch (Exception e)
            {
                resp.message = e.Message;
            }
            return resp;
        }

    }
}
