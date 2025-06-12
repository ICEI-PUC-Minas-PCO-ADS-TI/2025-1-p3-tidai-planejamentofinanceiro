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
    public class TransacaoController : ControllerBase
    {
        private readonly TransacaoService _service;
        private readonly ILogger<TransacaoController> _logger;

        public TransacaoController(TransacaoService service, ILogger<TransacaoController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpOptions]
        public IActionResult Options() => Ok();

        [HttpGet]
        public ActionResult<List<Transacao>> Get() => _service.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Transacao> Get(int id)
        {
            var item = _service.Get(id);
            return item is null ? NotFound() : item;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Transacao item)
        {
            try
            {
                var created = _service.Add(item);
                return CreatedAtAction(nameof(Get), new { id = created.IdTransacao }, created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar transacao.");
                return StatusCode(500, "Erro interno ao criar.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Transacao item)
        {
            if (item == null || item.IdTransacao != id) return BadRequest("ID inválido.");

            try
            {
                _service.Update(id, item);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar transacao com ID {Id}", id);
                return StatusCode(500, "Erro interno ao atualizar.");
            }
        }
    }
}