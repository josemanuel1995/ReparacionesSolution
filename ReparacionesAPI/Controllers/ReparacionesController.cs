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
    public class ReparacionesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ReparacionesController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReparacionDTO>>> GetReparaciones()
        {
            var reparaciones = await _context.Reparaciones.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ReparacionDTO>>(reparaciones));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReparacionDTO>> GetReparacion(int id)
        {
            var reparacion = await _context.Reparaciones.FindAsync(id);
            if (reparacion == null) return NotFound();

            return Ok(_mapper.Map<ReparacionDTO>(reparacion));
        }

        [HttpPost]
        public async Task<ActionResult<ReparacionDTO>> CreateReparacion(CrearReparacionDTO dto)
        {
            var reparacion = _mapper.Map<Reparacion>(dto);
            _context.Reparaciones.Add(reparacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReparacion), new { id = reparacion.Id }, _mapper.Map<ReparacionDTO>(reparacion));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReparacion(int id, CrearReparacionDTO dto)
        {
            var reparacion = await _context.Reparaciones.FindAsync(id);
            if (reparacion == null) return NotFound();

            reparacion.Descripcion = dto.Descripcion;
            reparacion.Costo = dto.Costo;
            reparacion.OrdenId = dto.OrdenId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReparacion(int id)
        {
            var reparacion = await _context.Reparaciones.FindAsync(id);
            if (reparacion == null) return NotFound();

            _context.Reparaciones.Remove(reparacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}
