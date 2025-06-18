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

  const formatarReal = valor => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const obterUsuarioLogado = () => {
    const usuario = localStorage.getItem('usuarioLogado');
    return usuario ? JSON.parse(usuario) : null;
  };

  async function carregarDados() {
    const usuario = obterUsuarioLogado();
    if (!usuario) return alert('Usuário não encontrado.');

    // Atualiza dados do perfil
    spanName.textContent = usuario.nomeUsuario || 'Usuário';
    spanAge.textContent = (localStorage.getItem('idadeUsuario') || '') + ' anos';
    spanPeriod.textContent = localStorage.getItem('periodoUsuario') || '';

    try {
      const res = await fetch('http://localhost:5284/Transacao');
      const transacoes = await res.json();

      const minhasTransacoes = transacoes.filter(t => t.usuarioFK === usuario.idUsuario);
      corpoTabela.innerHTML = '';

      let ganhos = 0, gastos = 0, investido = 0, lazer = 0;

      if (minhasTransacoes.length === 0) {
        corpoTabela.innerHTML = '<tr><td colspan="3" class="text-center">Nenhuma transação encontrada.</td></tr>';
        atualizarCards(ganhos, gastos, investido, lazer);
        return;
      }

      minhasTransacoes.forEach(t => {
        const data = new Date(t.dataTrans).toLocaleDateString('pt-BR');
        const valor = Math.abs(parseFloat(t.valorTrans)) || 0; // valor absoluto e fallback 0

        let cor = 'text-danger';
        let prefixo = '-';

        switch (t.descricaoCont) {
          case 'Salario Atual':
          case 'Salário Atual': // tratar ambas variações
            ganhos += valor;
            cor = 'text-success';
            prefixo = '+';
            break;
          case 'Gastos no Mês':
            gastos += valor;
            break;
          case 'Quanto Quer Investir':
            investido += valor;
            break;
          case 'Lazer':
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

      const totalFinal = ganhos - gastos - investido - lazer;

      const linhaTotal = document.createElement('tr');
      linhaTotal.innerHTML = `
        <td colspan="2" class="text-end fw-bold">Total Disponível:</td>
        <td class="fw-bold ${totalFinal >= 0 ? 'text-success' : 'text-danger'}">${formatarReal(totalFinal)}</td>
      `;
      corpoTabela.appendChild(linhaTotal);

      atualizarCards(ganhos, gastos, investido, lazer);

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao buscar transações.');
    }
  }

  function atualizarCards(ganhos, gastos, investido, lazer) {
    totalGanhos.textContent = formatarReal(ganhos);
    totalGastos.textContent = formatarReal(gastos);
    totalInvestido.textContent = formatarReal(investido);
    lazerDisponivel.textContent = formatarReal(lazer);
  }

  carregarDados();
});
