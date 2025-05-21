namespace ReparacionesAPI.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Celular { get; set; }
        public string Direccion { get; set; }
        public string Correo { get; set; }
        public ICollection<Orden> Ordenes { get; set; }
    }
}
