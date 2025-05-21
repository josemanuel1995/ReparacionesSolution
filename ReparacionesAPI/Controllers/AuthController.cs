using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReparacionesAPI.DTOs;
using ReparacionesAPI.Models;
using ReparacionesAPI.Services;
using System.Web;

namespace ReparacionesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly IEmailService _emailService;

        public AuthController(UserManager<ApplicationUser> userManager, TokenService tokenService, IEmailService emailService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingUser = await _userManager.FindByEmailAsync(dto.Email);
            if (existingUser != null)
                return BadRequest("Ya existe un usuario con este correo");

            var user = new ApplicationUser
            {
                Nombres = dto.Nombres,
                Apellido = dto.Apellido,
                TipoDocumento = dto.TipoDocumento,
                NumeroIdentificacion = dto.NumeroIdentificacion,
                FechaNacimiento = dto.FechaNacimiento,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                UserName = dto.Email
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Usuario registrado correctamente");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return Unauthorized("Usuario o contraseña incorrectos");

            var result = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!result)
                return Unauthorized("Usuario o contraseña incorrectos");

            var token = _tokenService.GenerateToken(user);
            return Ok(new { token });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest("Este correo no está registrado.");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var link = $"{model.FrontendUrl}/new-password?email={model.Email}&token={HttpUtility.UrlEncode(token)}";


            string html = $@"
            <html>
              <body>
                <h2>Hola {user.Nombres},</h2>
                <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href='{link}'>Restablecer contraseña</a>
              </body>
            </html>";

            await _emailService.SendEmailAsync(user.Email, "Recuperación de contraseña", html);


            return Ok("Correo enviado");
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest("Usuario no encontrado");

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Contraseña actualizada correctamente");
        }


    }
}
