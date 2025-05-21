using Microsoft.AspNetCore.Identity;

namespace ReparacionesAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Nombres { get; set; }
        public string Apellido { get; set; }
        public string TipoDocumento { get; set; } // CC, NIT, CE
        public string NumeroIdentificacion { get; set; }
        public DateTime FechaNacimiento { get; set; }
    }
}
