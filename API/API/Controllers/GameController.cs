using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL;
using DAL;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private GameBLL gameBll;
        public GameController(GameDataContext _db)
        {
            gameBll = new GameBLL(_db);
        }

        // GET: api/Game/5
        [HttpGet("{id}")]
        public ActionResult<Response> Get(long id)
        {
            try
            {
                var resp = gameBll.Get(id);
                if (!resp.status)
                    return NotFound(resp);
                return Ok(resp);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}/rounds")]
        public ActionResult<Response> GetRounds(long id)
        {
            try
            {
                var resp = gameBll.GetRounds(id);
                if (!resp.status)
                    return NotFound(resp);
                return Ok(resp);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/Game
        [HttpPost]
        public ActionResult Post([FromBody] Game game)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Invalid model object");

                var resp = gameBll.Create(game);
                if (!resp.status)
                    return NotFound(resp);
                return CreatedAtAction(nameof(Get), new { id = game.GameID }, resp);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
