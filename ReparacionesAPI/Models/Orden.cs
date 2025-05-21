namespace ReparacionesAPI.Models
{
    public class Orden
    {
        public int Id { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }
        public ICollection<Reparacion> Reparaciones { get; set; }
    }
}
