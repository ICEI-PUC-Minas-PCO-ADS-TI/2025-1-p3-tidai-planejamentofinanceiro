document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);

  // Função utilitária para formatar valores em Real
  function formatarReal(valor) {
    const num = typeof valor === 'number' ? valor : parseFloat(String(valor).replace(/\./g, '').replace(',', '.'));
    if (isNaN(num)) return 'R$ 0,00';
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Funções para salvar e obter usuário logado no localStorage
  function salvarUsuarioLocal(usuario) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }
  function obterUsuarioLocal() {
    const data = localStorage.getItem('usuarioLogado');
    return data ? JSON.parse(data) : null;
  }

  // Elementos do perfil
  const spanName   = $('user-name');
  const spanAge    = $('user-age');
  const spanPeriod = $('user-period');

  // Elementos das estatísticas
  const totalGanhos     = $('total-ganhos');
  const totalGastos     = $('total-gastos');
  const totalInvestido  = $('total-investido');
  const lazerDisponivel = $('lazer-disponivel');

  // Elementos do modal
  const modal        = $('modal');
  const modalContent = modal.querySelector('.modal-content');
  const btnEdit      = $('editProfile');
  const btnEditStats = $('editStats');
  const btnClose     = modal.querySelector('.close');
  const btnSave      = $('saveProfile');
  const inName       = $('editName');
  const inAge        = $('editAge');
  const inPeriod     = $('editPeriod');
  const inGanhos     = $('editGanhos');
  const inGastos     = $('editGastos');
  const inInvestido  = $('editInvestido');
  const inLazer      = $('editLazer');

  // Elementos da tabela de transações
  const tabelaTransacoes = $('tabelaTransacoes'); // <tbody id="tabelaTransacoes"></tbody> no HTML

  // BUSCA DADOS DO USUÁRIO E DAS ESTATÍSTICAS
  async function carregarPerfil() {
    // Primeiro tenta do localStorage
    let data = obterUsuarioLocal();
    if (!data) {
      try {
        const res = await fetch('http://localhost:5284/Usuario', { method: 'GET', credentials: 'include' });
        data = await res.json();
        // Se for um array, pegue o primeiro usuário (ajuste conforme sua API)
        if (Array.isArray(data)) data = data[0];
        if (data) salvarUsuarioLocal(data);
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
        return;
      }
    }

    // Preenche perfil
    spanName.textContent   = data.nome || data.nomeUsuario || 'Usuário';
    spanAge.textContent    = data.idade ? `${data.idade} anos` : '';
    spanPeriod.textContent = data.periodo || '';

    // Preenche estatísticas com formatação correta
    totalGanhos.textContent     = formatarReal(data.totalGanhos ?? '0,00');
    totalGastos.textContent     = formatarReal(data.totalGastos ?? '0,00');
    totalInvestido.textContent  = formatarReal(data.totalInvestido ?? '0,00');
    lazerDisponivel.textContent = formatarReal(data.lazerDisponivel ?? '0,00');
  }

  // BUSCA E EXIBE AS TRANSAÇÕES SALVAS
  async function carregarTransacoes() {
    if (!tabelaTransacoes) return;
    try {
      const res = await fetch('http://localhost:5284/Transacao', { method: 'GET', credentials: 'include' });
      const transacoes = await res.json();
      tabelaTransacoes.innerHTML = '';
      if (Array.isArray(transacoes)) {
        transacoes.forEach(transacao => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${transacao.descricaoCont}</td>
            <td>${formatarReal(transacao.valorTrans)}</td>
            <td>${transacao.tipoTrans}</td>
            <td>${new Date(transacao.dataTrans).toLocaleDateString('pt-BR')}</td>
          `;
          tabelaTransacoes.appendChild(tr);
        });
      }
    } catch (err) {
      console.error('Erro ao buscar transações:', err);
    }
  }

  // Função para abrir o modal preenchendo todos os campos
  function showModal(focusField = 'name') {
    inName.value      = spanName.textContent.trim();
    inAge.value       = spanAge.textContent.replace(/\D/g,'');
    inPeriod.value    = spanPeriod.textContent.trim();
    inGanhos.value    = totalGanhos.textContent.replace(/[^\d,]/g,'').trim();
    inGastos.value    = totalGastos.textContent.replace(/[^\d,]/g,'').trim();
    inInvestido.value = totalInvestido.textContent.replace(/[^\d,]/g,'').trim();
    inLazer.value     = lazerDisponivel.textContent.replace(/[^\d,]/g,'').trim();
    modal.classList.add('d-flex');
    if (focusField === 'stats') {
      inGanhos.focus();
    } else {
      inName.focus();
    }
  }

  const hideModal = () => { modal.classList.remove('d-flex'); };

  const saveProfile = () => {
    const name      = inName.value.trim();
    const age       = parseInt(inAge.value.trim(),10);
    const period    = inPeriod.value.trim();
    const ganhos    = inGanhos.value.trim();
    const gastos    = inGastos.value.trim();
    const investido = inInvestido.value.trim();
    const lazer     = inLazer.value.trim();

    if (name)   spanName.textContent = name;
    if (!isNaN(age) && age > 0) spanAge.textContent = `${age} anos`;
    if (period) spanPeriod.textContent = period;

    // Formata os valores ao salvar
    totalGanhos.textContent     = formatarReal(ganhos || '0,00');
    totalGastos.textContent     = formatarReal(gastos || '0,00');
    totalInvestido.textContent  = formatarReal(investido || '0,00');
    lazerDisponivel.textContent = formatarReal(lazer || '0,00');

    // Atualiza localStorage com os novos dados
    salvarUsuarioLocal({
      nome: name,
      idade: age,
      periodo: period,
      totalGanhos: ganhos,
      totalGastos: gastos,
      totalInvestido: investido,
      lazerDisponivel: lazer
    });

    hideModal();
  };

  // Bindings
  btnEdit     .addEventListener('click', () => showModal('name'));
  btnEditStats.addEventListener('click', () => showModal('stats'));
  btnClose    .addEventListener('click', hideModal);
  btnSave     .addEventListener('click', saveProfile);

  // Fecha clicando fora do modal
  modal.addEventListener('click', e => {
    if (!modalContent.contains(e.target)) hideModal();
  });

  // Fecha no ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('d-flex')) hideModal();
  });

  // Envio de nova transação
  const formTransacao = document.getElementById('formTransacao');
  if (formTransacao) {
    formTransacao.addEventListener('submit', async function (e) {
      e.preventDefault();

      const descricao = document.getElementById('descricao').value;
      const valorTransacao = parseFloat(document.getElementById('valorTransacao').value);
      const tipo = document.getElementById('tipo').value;
      const dataTransacao = document.getElementById('dataTransacao').value;
      // Busca o usuário logado do localStorage para pegar o ID
      const usuarioLogado = obterUsuarioLocal();
      const usuarioId = usuarioLogado && usuarioLogado.idUsuario ? usuarioLogado.idUsuario : null;

      if (!descricao || isNaN(valorTransacao) || !tipo || !dataTransacao || !usuarioId) {
        alert('Preencha todos os campos corretamente!');
        return;
      }

      try {
        const response = await fetch('http://localhost:5284/Transacao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            DescricaoCont: descricao,
            ValorTrans: valorTransacao,
            TipoTrans: tipo,
            DataTrans: dataTransacao,
            UsuarioFK: usuarioId
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(errText || 'Erro ao cadastrar transação');
        }

        alert('Transação cadastrada com sucesso!');
        formTransacao.reset();
        await carregarTransacoes(); // Atualiza a lista após cadastrar
      } catch (error) {
        alert('Erro ao cadastrar transação: ' + error.message);
      }
    });
  }

  // Inicialização automática ao carregar a página
  (async function initPerfil() {
    await carregarPerfil();
    await carregarTransacoes();
  })();
});