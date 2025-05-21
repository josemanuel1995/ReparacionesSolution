namespace ReparacionesAPI.Models
{
    public class Reparacion
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public decimal Costo { get; set; }
        public int OrdenId { get; set; }
        public Orden Orden { get; set; }
    }
}
