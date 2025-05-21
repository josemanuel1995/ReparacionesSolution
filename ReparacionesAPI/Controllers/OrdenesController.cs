namespace ReparacionesAPI.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using AutoMapper;
    using ReparacionesAPI.Data;
    using ReparacionesAPI.Models;
    using ReparacionesAPI.DTOs;

    [ApiController]
    [Route("api/[controller]")]
    public class OrdenesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public OrdenesController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrdenDTO>>> GetOrdenes()
        {
            var ordenes = await _context.Ordenes.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<OrdenDTO>>(ordenes));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrdenDTO>> GetOrden(int id)
        {
            var orden = await _context.Ordenes.FindAsync(id);
            if (orden == null) return NotFound();

            return Ok(_mapper.Map<OrdenDTO>(orden));
        }

        [HttpPost]
        public async Task<ActionResult<OrdenDTO>> CreateOrden(CrearOrdenDTO dto)
        {
            var orden = new Orden
            {
                ClienteId = dto.ClienteId,
                FechaCreacion = DateTime.UtcNow
            };

            _context.Ordenes.Add(orden);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrden), new { id = orden.Id }, _mapper.Map<OrdenDTO>(orden));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrden(int id, CrearOrdenDTO dto)
        {
            var orden = await _context.Ordenes.FindAsync(id);
            if (orden == null) return NotFound();

            orden.ClienteId = dto.ClienteId;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrden(int id)
        {
            var orden = await _context.Ordenes.FindAsync(id);
            if (orden == null) return NotFound();

            _context.Ordenes.Remove(orden);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}
