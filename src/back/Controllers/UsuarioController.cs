using CashWiseAPI.Models;
using CashWiseAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace CashWiseAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;
        private readonly ILogger<UsuarioController> _logger;

        public UsuarioController(UsuarioService service, ILogger<UsuarioController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpOptions]
        public IActionResult Options() => Ok();

        [HttpGet]
        public ActionResult<List<Usuario>> Get() => _service.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Usuario> Get(int id)
        {
            var item = _service.Get(id);
            return item is null ? NotFound() : item;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Usuario item)
        {
            try
            {
                var created = _service.Add(item);
                return CreatedAtAction(nameof(Get), new { id = created.IdUsuario }, created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar usuario.");
                return StatusCode(500, "Erro interno ao criar.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Usuario item)
        {
            if (item == null || item.IdUsuario != id) return BadRequest("ID inválido.");

            try
            {
                _service.Update(id, item);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar usuario com ID {Id}", id);
                return StatusCode(500, "Erro interno ao atualizar.");
            }
        }
    }
}