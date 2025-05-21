namespace ReparacionesAPI.DTOs
{
    public class ReparacionDTO
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public decimal Costo { get; set; }
        public int OrdenId { get; set; }
    }

}
