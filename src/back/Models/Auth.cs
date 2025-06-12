// Models/Auth.cs
namespace CashWiseAPI.Models
{
    public class Auth
    {

        public string NomeUsuario { get; set; } = string.Empty;
        public int IdUsuario { get; set; } = 0; // Inicialização direta

    public string EmailUsuario { get; set; } = string.Empty; // Inicialização direta

    public string SenhaUsuario { get; set; } = string.Empty; // inicializar para evitar warning
    }
}
