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

    public class ConteudoController : ControllerBase
    {
        private readonly ConteudoService _service;
        private readonly ILogger<ConteudoController> _logger;

        public ConteudoController(ConteudoService service, ILogger<ConteudoController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpOptions]
        public IActionResult Options() => Ok();

        [HttpGet]
        public ActionResult<List<Conteudo>> Get() => _service.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Conteudo> Get(int id)
        {
            var item = _service.Get(id);
            return item is null ? NotFound() : item;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Conteudo item)
        {
            try
            {
                var created = _service.Add(item);
                return CreatedAtAction(nameof(Get), new { id = created.IdConteudo }, created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar conteudo.");
                return StatusCode(500, "Erro interno ao criar.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Conteudo item)
        {
            if (item == null || item.IdConteudo != id) return BadRequest("ID inválido.");

            try
            {
                _service.Update(id, item);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar conteudo com ID {Id}", id);
                return StatusCode(500, "Erro interno ao atualizar.");
            }
        }
    }
}