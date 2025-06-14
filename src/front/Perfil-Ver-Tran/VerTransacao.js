document.addEventListener('DOMContentLoaded', async () => {
  const $ = id => document.getElementById(id);

  const spanName = $('user-name');
  const spanAge = $('user-age');
  const spanPeriod = $('user-period');
  const totalGanhos = $('total-ganhos');
  const totalGastos = $('total-gastos');
  const totalInvestido = $('total-investido');
  const lazerDisponivel = $('lazer-disponivel');
  const corpoTabela = document.querySelector('tbody');

  function formatarReal(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function obterUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    return usuario ? JSON.parse(usuario) : null;
  }

  async function carregarDados() {
    const usuario = obterUsuarioLogado();
    if (!usuario) return alert('Usuário não encontrado.');

    // Atualiza nome e info do perfil
    spanName.textContent = usuario.nomeUsuario;
    spanAge.textContent = localStorage.getItem('idadeUsuario') + ' anos' || '';
    spanPeriod.textContent = localStorage.getItem('periodoUsuario') || '';

    try {
      const res = await fetch('http://localhost:5284/Transacao');
      const transacoes = await res.json();

      const minhasTransacoes = transacoes.filter(t => t.usuarioFK === usuario.idUsuario);
      corpoTabela.innerHTML = '';

      let ganhos = 0, gastos = 0, investido = 0, lazer = 0;

      if (minhasTransacoes.length === 0) {
        corpoTabela.innerHTML = '<tr><td colspan="3" class="text-center">Nenhuma transação encontrada.</td></tr>';
        return;
      }

      minhasTransacoes.forEach(t => {
        const data = new Date(t.dataTrans).toLocaleDateString('pt-BR');
        const valor = parseFloat(t.valorTrans);

        let cor = 'text-danger';
        let prefixo = '-';

        // Define categoria e soma em grupo
        switch (t.descricaoCont) {
          case 'Total de Ganhos':
            ganhos += valor;
            cor = 'text-success';
            prefixo = '+';
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

        const linha = document.createElement('tr');
        linha.innerHTML = `
          <td>${data}</td>
          <td>${t.descricaoCont}</td>
          <td class="fw-bold ${cor}">${prefixo}${formatarReal(valor)}</td>
        `;
        corpoTabela.appendChild(linha);
      });

      // Adiciona linha total
      const totalFinal = ganhos - gastos - investido - lazer;
      const linhaTotal = document.createElement('tr');
      linhaTotal.innerHTML = `
        <td colspan="2" class="text-end fw-bold">Total:</td>
        <td class="fw-bold ${totalFinal >= 0 ? 'text-success' : 'text-danger'}">${formatarReal(totalFinal)}</td>
      `;
      corpoTabela.appendChild(linhaTotal);

      // Atualiza os cards
      totalGanhos.textContent = formatarReal(ganhos);
      totalGastos.textContent = formatarReal(gastos);
      totalInvestido.textContent = formatarReal(investido);
      lazerDisponivel.textContent = formatarReal(lazer);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao buscar transações.');
    }
  }

  carregarDados();
});
