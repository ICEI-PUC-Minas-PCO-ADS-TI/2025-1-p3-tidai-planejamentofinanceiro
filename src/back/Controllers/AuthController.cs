using Microsoft.AspNetCore.Mvc;
using CashWiseAPI.Controllers;
using CashWiseAPI.Services;
using CashWiseAPI.Models;


[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly UsuarioService _usuarioService;
    private readonly TokenService _tokenService;

    public AuthController(UsuarioService usuarioService, TokenService tokenService)
    {
        _usuarioService = usuarioService;
        _tokenService = tokenService;
    }

    [HttpPost("Login")]
    public IActionResult Login([FromBody] Auth login)
    {
        var usuario = _usuarioService.GetAll()
            .FirstOrDefault(u => u.EmailUsuario == login.EmailUsuario && u.SenhaUsuario == login.SenhaUsuario);

        if (usuario == null)
        {
            return Unauthorized("Credenciais inválidas");
        }

        var token = _tokenService.GenerateToken(usuario.IdUsuario, usuario.EmailUsuario);

        return Ok(new
        {
               Token = token,
    UsuarioId = usuario.IdUsuario,
    EmailUsuario = usuario.EmailUsuario,
    NomeUsuario = usuario.NomeUsuario,
    Endividado = usuario.Endividado
    // Adicione outros campos se quiser
        });
    }
}
