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
    public class MetaFinanceiraController : ControllerBase
    {
        private readonly MetaFinanceiraService _service;
        private readonly ILogger<MetaFinanceiraController> _logger;

        public MetaFinanceiraController(MetaFinanceiraService service, ILogger<MetaFinanceiraController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpOptions]
        public IActionResult Options() => Ok();

        [HttpGet]
        public ActionResult<List<MetaFinanceira>> Get() => _service.GetAll();

        [HttpGet("{id}")]
        public ActionResult<MetaFinanceira> Get(int id)
        {
            var item = _service.Get(id);
            return item is null ? NotFound() : item;
        }

        [HttpPost]
        public IActionResult Create([FromBody] MetaFinanceira item)
        {
            try
            {
                var created = _service.Add(item);
                return CreatedAtAction(nameof(Get), new { id = created.IdMeta }, created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar metafinanceira.");
                return StatusCode(500, "Erro interno ao criar.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] MetaFinanceira item)
        {
            if (item == null || item.IdMeta != id) return BadRequest("ID inválido.");

            try
            {
                _service.Update(id, item);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar metafinanceira com ID {Id}", id);
                return StatusCode(500, "Erro interno ao atualizar.");
            }
        }
    }
}