using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiPontosTuristicos.Data;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json.Linq;
using Canducci.Pagination;
using Newtonsoft.Json;

namespace ApiPontosTuristicos.Controllers
{
    [EnableCors("TCAPolicy")]
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

        [HttpGet("nome/{pesquisa}/{quantidadeRegistro}/{pagina}")]
        public IActionResult Get(string pesquisa, int quantidadeRegistro, int pagina)
        {
            
            if (pagina <= 0) pagina = 1;

            var totalPaginas = (int)Math.Ceiling(_context.PontoTuristicos.Where(s => s.NomePontoTuristico.Contains(pesquisa) || s.DescricaoPontoTuristico.Contains(pesquisa) || s.EnderecoPontoTuristico.Contains(pesquisa)).Count() / Convert.ToDecimal(quantidadeRegistro));

            var nextPagina = pagina;

            if (pagina > totalPaginas)
            {
                nextPagina = pagina;
            }
            else
            {
                nextPagina = pagina + 1;
            }



            var ponto = _context.PontoTuristicos
                             .Where(s => s.NomePontoTuristico.Contains(pesquisa) || s.DescricaoPontoTuristico.Contains(pesquisa) || s.EnderecoPontoTuristico.Contains(pesquisa))
                             .OrderBy(s => s.DataInclusaoPontoTuristico)
                             .Skip(quantidadeRegistro * (pagina - 1))
                             .Take(quantidadeRegistro);

            Console.WriteLine(ponto);


            if (ponto == null)
            {
                return NotFound();
            }

            var j = JsonConvert.SerializeObject(new
            {
                ponto,
                TotalPaginas = totalPaginas,
                NextPagina = nextPagina,
                PaginaAtual = pagina
            });

            return Ok(j);
        }


        // GET: api/PontoTuristicos/nome/{pesquisa}
        [HttpGet("nome2/{pesquisa}/{quantidadeRegistro}/{pagina}")]
        public async Task<ActionResult<IEnumerable<PontoTuristico>>> GetNomePontoTuristico(string pesquisa, int quantidadeRegistro, int pagina)
        {
            var totalPaginas = (int)Math.Ceiling(_context.PontoTuristicos.Where(s => s.NomePontoTuristico.Contains(pesquisa)).Count() / Convert.ToDecimal(quantidadeRegistro));

            var nextPagina = pagina;

            if (pagina > totalPaginas)
            {
                nextPagina = pagina;

            } else
            {
                nextPagina = pagina + 1;
            }

            var ponto = _context.PontoTuristicos.Where(s => s.NomePontoTuristico.Contains(pesquisa))
                             .OrderBy(s => s.DataInclusaoPontoTuristico)
                             .Skip(quantidadeRegistro * (pagina - 1))
                             .Take(quantidadeRegistro);

            HttpContext.Response.Headers.Add("X-Pages-TotalPages", totalPaginas.ToString());
            HttpContext.Response.Headers.Add("X-Pagina-Atual", pagina.ToString());
            HttpContext.Response.Headers.Add("X-Next-Pagina", nextPagina.ToString());

            if (ponto == null)
            {
                return NotFound();
            }

            return await ponto.ToListAsync();
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
