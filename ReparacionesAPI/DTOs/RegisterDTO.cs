using System.ComponentModel.DataAnnotations;

namespace ReparacionesAPI.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string Nombres { get; set; }

        [Required]
        public string Apellido { get; set; }

        [Required]
        [RegularExpression("^(CC|NIT|CE)$", ErrorMessage = "Tipo de documento inválido")]
        public string TipoDocumento { get; set; }

        [Required]
        public string NumeroIdentificacion { get; set; }

        [Required]
        public DateTime FechaNacimiento { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "La contraseña debe tener al menos 8 caracteres")]
        public string Password { get; set; }
    }
}
