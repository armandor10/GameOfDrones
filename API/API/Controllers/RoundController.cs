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
    public class RoundController : ControllerBase
    {
        private readonly RoundBLL roundBll;
        public RoundController(GameDataContext _db)
        {
            roundBll = new RoundBLL(_db);
        }

        // GET: api/Round/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var resp = roundBll.Get(id);
                if (!resp.status)
                    return NotFound(resp);
                return Ok(resp);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/Round
        [HttpPost]
        public ActionResult Post([FromBody] Round round)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Invalid model object");

                var resp = roundBll.Create(round);
                if (!resp.status)
                    return NotFound(resp);
                return CreatedAtAction(nameof(Get), new { id = round.RoundID }, resp);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
