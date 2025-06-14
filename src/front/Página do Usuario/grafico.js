document.addEventListener('DOMContentLoaded', async () => {
  const $ = id => document.getElementById(id);

  const coluna = $('grafico-coluna');
  const pizza = $('grafico-pizza');
  const comparativo = $('grafico-comparativo');

  function formatarReal(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function obterUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    return usuario ? JSON.parse(usuario) : null;
  }

  async function carregarDados() {
    const usuario = obterUsuarioLogado();
    if (!usuario) {
      alert('Usuário não encontrado.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5284/Transacao');
      const transacoes = await res.json();

      const minhasTransacoes = transacoes.filter(t => t.usuarioFK === usuario.idUsuario);

      let ganhos = 0, gastos = 0, investido = 0, lazer = 0;

      minhasTransacoes.forEach(t => {
        const valor = parseFloat(t.valorTrans);
        switch (t.descricaoCont) {
          case 'Total de Ganhos':
            ganhos += valor;
            break;
          case 'Total de Gastos':
            gastos += valor;
            break;
          case 'Total Investido':
            investido += valor;
            break;
          case 'Lazer Disponível':
            lazer += valor;
            break;
        }
      });

      gerarGraficos(ganhos, gastos, investido, lazer);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao buscar transações.');
    }
  }

  function gerarGraficos(ganhos, gastos, investido, lazer) {
    const dados = [ganhos, gastos, investido, lazer];
    const labels = ['Ganhos', 'Gastos', 'Investido', 'Lazer'];
    const cores = ['#4CAF50', '#F44336', '#2196F3', '#FF9800'];

    // Gráfico de Coluna
    new Chart(coluna, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '', // removido para não mostrar legenda lateral
          data: dados,
          backgroundColor: cores
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Resumo Financeiro por Categoria'
          },
          tooltip: {
            callbacks: {
              label: ctx => formatarReal(ctx.raw)
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: valor => formatarReal(valor)
            }
          }
        }
      }
    });

    // Gráfico de Pizza
    new Chart(pizza, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data: dados,
          backgroundColor: cores
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Distribuição das Transações'
          },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${formatarReal(ctx.raw)}`
            }
          }
        }
      }
    });

    // Gráfico Comparativo Simples (Ganhos vs Gastos Totais)
    const gastosTotais = gastos + investido + lazer;

    new Chart(comparativo, {
      type: 'bar',
      data: {
        labels: ['Ganhos', 'Gastos Totais'],
        datasets: [{
          data: [ganhos, gastosTotais],
          backgroundColor: ['#4CAF50', '#F44336']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Comparativo de Ganhos e Gastos Totais'
          },
          tooltip: {
            callbacks: {
              label: ctx => formatarReal(ctx.raw)
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: valor => formatarReal(valor)
            }
          }
        }
      }
    });
  }

  carregarDados();
});
