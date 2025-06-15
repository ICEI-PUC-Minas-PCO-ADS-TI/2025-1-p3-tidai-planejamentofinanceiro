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

      // Filtra transações do usuário atual
      const minhasTransacoes = transacoes.filter(t => t.usuarioFK === usuario.idUsuario);

      // Inicializa os valores
      let salarioAtual = 0, gastosNoMes = 0, quantoQuerInvestir = 0, lazer = 0;

      // Para cada transação, pega o valor conforme a descrição atualizada
      minhasTransacoes.forEach(t => {
        const valor = parseFloat(t.valorTrans) || 0;
        switch(t.descricaoCont) {
          case 'Salário Atual':
            salarioAtual += valor;
            break;
          case 'Gastos no Mês':
            gastosNoMes += valor;
            break;
          case 'Quanto Quer Investir':
            quantoQuerInvestir += valor;
            break;
          case 'Lazer':
            lazer += valor;
            break;
        }
      });

      gerarGraficos(salarioAtual, gastosNoMes, quantoQuerInvestir, lazer);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao buscar transações.');
    }
  }

  function gerarGraficos(salarioAtual, gastosNoMes, quantoQuerInvestir, lazer) {
    const dados = [salarioAtual, gastosNoMes, quantoQuerInvestir, lazer];
    const labels = ['Salário Atual', 'Gastos no Mês', 'Quanto Quer Investir', 'Lazer'];
    const cores = ['#4CAF50', '#F44336', '#2196F3', '#FF9800'];

    // Gráfico de Coluna
    new Chart(coluna, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: '',
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
            text: 'Distribuição das Categorias'
          },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${formatarReal(ctx.raw)}`
            }
          }
        }
      }
    });

    // Gráfico Comparativo (Salário vs Gastos + Investimentos + Lazer)
    const totalGastos = gastosNoMes + quantoQuerInvestir + lazer;

    new Chart(comparativo, {
      type: 'bar',
      data: {
        labels: ['Salário Atual', 'Total Gastos'],
        datasets: [{
          data: [salarioAtual, totalGastos],
          backgroundColor: ['#4CAF50', '#F44336']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Comparativo Salário e Gastos Totais'
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
