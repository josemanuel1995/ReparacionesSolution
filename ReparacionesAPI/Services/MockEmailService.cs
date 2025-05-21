namespace ReparacionesAPI.Services
{
    public class MockEmailService : IEmailService
    {
        public Task SendEmailAsync(string to, string subject, string body)
        {
            Console.WriteLine("🔔 Simulación de envío de correo:");
            Console.WriteLine($"   📧 Para: {to}");
            Console.WriteLine($"   📝 Asunto: {subject}");
            Console.WriteLine($"   📨 Cuerpo:\n{body}");

            // Simula una espera real de red
            return Task.CompletedTask;
        }
    }
}
