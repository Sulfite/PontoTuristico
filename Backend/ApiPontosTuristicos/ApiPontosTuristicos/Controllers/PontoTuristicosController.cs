﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiPontosTuristicos.Data;

namespace ApiPontosTuristicos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PontoTuristicosController : ControllerBase
    {
        private readonly AppBdContext _context;

        public PontoTuristicosController(AppBdContext context)
        {
            _context = context;
        }

        // GET: api/PontoTuristicos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PontoTuristico>>> GetPontoTuristicos()
        {
            return await _context.PontoTuristicos.ToListAsync();
        }

        // GET: api/PontoTuristicos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PontoTuristico>> GetPontoTuristico(int id)
        {
            var pontoTuristico = await _context.PontoTuristicos.FindAsync(id);

            if (pontoTuristico == null)
            {
                return NotFound();
            }

            return pontoTuristico;
        }

        // PUT: api/PontoTuristicos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPontoTuristico(int id, PontoTuristico pontoTuristico)
        {
            if (id != pontoTuristico.Id)
            {
                return BadRequest();
            }

            _context.Entry(pontoTuristico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PontoTuristicoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PontoTuristicos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PontoTuristico>> PostPontoTuristico(PontoTuristico pontoTuristico)
        {
            _context.PontoTuristicos.Add(pontoTuristico);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPontoTuristico", new { id = pontoTuristico.Id }, pontoTuristico);
        }

        // DELETE: api/PontoTuristicos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePontoTuristico(int id)
        {
            var pontoTuristico = await _context.PontoTuristicos.FindAsync(id);
            if (pontoTuristico == null)
            {
                return NotFound();
            }

            _context.PontoTuristicos.Remove(pontoTuristico);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PontoTuristicoExists(int id)
        {
            return _context.PontoTuristicos.Any(e => e.Id == id);
        }
    }
}