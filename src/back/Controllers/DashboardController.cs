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
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _service;
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(DashboardService service, ILogger<DashboardController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpOptions]
        public IActionResult Options() => Ok();

        [HttpGet]
        public ActionResult<List<Dashboard>> Get() => _service.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Dashboard> Get(int id)
        {
            var item = _service.Get(id);
            return item is null ? NotFound() : item;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Dashboard item)
        {
            try
            {
                var created = _service.Add(item);
                return CreatedAtAction(nameof(Get), new { id = created.IdDash }, created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar dashboard.");
                return StatusCode(500, "Erro interno ao criar.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Dashboard item)
        {
            if (item == null || item.IdDash != id) return BadRequest("ID inválido.");

            try
            {
                _service.Update(id, item);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar dashboard com ID {Id}", id);
                return StatusCode(500, "Erro interno ao atualizar.");
            }
        }
    }
}