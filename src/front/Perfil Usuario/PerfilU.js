document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);

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
  const modalContent = modal ? modal.querySelector('.modal-content') : null;
  const btnEdit      = $('editProfile');
  const btnEditStats = $('editStats');
  const btnClose     = modal ? modal.querySelector('.close') : null;
  const btnSave      = $('saveProfile');
  const inName       = $('editName');
  const inAge        = $('editAge');
  const inPeriod     = $('editPeriod');
  const inGanhos     = $('editGanhos');
  const inGastos     = $('editGastos');
  const inInvestido  = $('editInvestido');
  const inLazer      = $('editLazer');

  // Avatar
  const avatarImg = $('admin-avatar');
  const avatarInput = $('avatarInput');
  const btnChangeAvatar = $('changeAvatar');

  if (btnChangeAvatar && avatarInput && avatarImg) {
    btnChangeAvatar.addEventListener('click', () => {
      avatarInput.click();
    });

    avatarInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          avatarImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Array para armazenar o histórico de dados
  const historico = [];

  // Função para abrir o modal preenchendo todos os campos e labels
  function showModal(focusField = 'name') {
    if ($('labelName'))      $('labelName').textContent      = spanName.textContent.trim();
    if ($('labelAge'))       $('labelAge').textContent       = spanAge.textContent.trim();
    if ($('labelPeriod'))    $('labelPeriod').textContent    = spanPeriod.textContent.trim();
    if ($('labelGanhos'))    $('labelGanhos').textContent    = totalGanhos.textContent.trim();
    if ($('labelGastos'))    $('labelGastos').textContent    = totalGastos.textContent.trim();
    if ($('labelInvestido')) $('labelInvestido').textContent = totalInvestido.textContent.trim();
    if ($('labelLazer'))     $('labelLazer').textContent     = lazerDisponivel.textContent.trim();

    if (inName)      inName.value      = spanName.textContent.trim();
    if (inAge)       inAge.value       = spanAge.textContent.replace(/\D/g,'');
    if (inPeriod)    inPeriod.value    = spanPeriod.textContent.trim();
    if (inGanhos)    inGanhos.value    = totalGanhos.textContent.replace(/[^\d,]/g,'').trim();
    if (inGastos)    inGastos.value    = totalGastos.textContent.replace(/[^\d,]/g,'').trim();
    if (inInvestido) inInvestido.value = totalInvestido.textContent.replace(/[^\d,]/g,'').trim();
    if (inLazer)     inLazer.value     = lazerDisponivel.textContent.replace(/[^\d,]/g,'').trim();

    if (modal) modal.classList.add('d-flex');
    if (focusField === 'stats' && inGanhos) {
      inGanhos.focus();
    } else if (inName) {
      inName.focus();
    }
  }

  const hideModal = () => { if (modal) modal.classList.remove('d-flex'); };

  // Função para atualizar a tabela de transações
  function atualizarTabelaTransacoes() {
    fetch('http://localhost:5284/Transacao', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(transacoes => {
      let tabelaTransacoes = document.getElementById('tabela-transacoes');
      if (!tabelaTransacoes) {
        tabelaTransacoes = document.createElement('table');
        tabelaTransacoes.id = 'tabela-transacoes';
        tabelaTransacoes.className = 'table table-striped mt-4';
        tabelaTransacoes.innerHTML = `
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody></tbody>
        `;
        const main = document.querySelector('main');
        if (main) main.appendChild(tabelaTransacoes);
        else document.body.appendChild(tabelaTransacoes);
      }
      const tbody = tabelaTransacoes.querySelector('tbody');
      tbody.innerHTML = '';
      transacoes.forEach(transacao => {
        // Tratamento robusto para tipoTrans
        let tipo = (transacao.tipoTrans || '').toLowerCase();
        let cor = '';
        let sinal = '';
        if (tipo === 'receita') {
          cor = 'text-success';
          sinal = '+';
        } else if (tipo === 'despesa') {
          cor = 'text-danger';
          sinal = '-';
        } else if (tipo === 'investimento') {
          cor = 'text-info';
          sinal = '';
        } else if (tipo === 'lazer') {
          cor = 'text-secondary';
          sinal = '';
        }
        const valorFormatado = `R$ ${Number(transacao.valorTrans).toFixed(2)}`;
        const tipoExibicao = transacao.tipoTrans && transacao.tipoTrans.trim() !== '' ? transacao.tipoTrans : '-';
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${new Date(transacao.dataTrans).toLocaleDateString('pt-BR')}</td>
          <td>${transacao.descricaoCont}</td>
          <td class="${cor} fw-bold">${sinal}${valorFormatado}</td>
          <td>${tipoExibicao}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar transações:', error);
    });
  }

  // Salva no backend via API
  const saveProfile = () => {
    const name      = inName ? inName.value.trim() : '';
    const age       = inAge ? parseInt(inAge.value.trim(),10) : '';
    const period    = inPeriod ? inPeriod.value.trim() : '';
    const ganhos    = inGanhos ? inGanhos.value.trim().replace(',', '.') : '';
    const gastos    = inGastos ? inGastos.value.trim().replace(',', '.') : '';
    const investido = inInvestido ? inInvestido.value.trim().replace(',', '.') : '';
    const lazer     = inLazer ? inLazer.value.trim().replace(',', '.') : '';

    // Salva o histórico antes de atualizar
    historico.push({
      nome: spanName.textContent,
      idade: spanAge.textContent,
      periodo: spanPeriod.textContent,
      totalGanhos: totalGanhos.textContent,
      totalGastos: totalGastos.textContent,
      totalInvestido: totalInvestido.textContent,
      lazerDisponivel: lazerDisponivel.textContent,
      dataHora: new Date().toLocaleString()
    });

    // Atualiza na tela
    if (name)   spanName.textContent = name;
    if (!isNaN(age) && age > 0) spanAge.textContent = `${age} anos`;
    if (period) spanPeriod.textContent = period;

    totalGanhos.textContent     = `R$ ${ganhos || '0,00'}`;
    totalGastos.textContent     = `R$ ${gastos || '0,00'}`;
    totalInvestido.textContent  = `R$ ${investido || '0,00'}`;
    lazerDisponivel.textContent = `R$ ${lazer || '0,00'}`;

    // Função para enviar uma transação ao backend
    function enviarTransacao(descricao, valor, tipo) {
      if (!valor || isNaN(Number(valor))) return Promise.resolve();
      return fetch('http://localhost:5284/Transacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descricaoCont: descricao,
          valorTrans: Number(valor),
          tipoTrans: tipo,
          dataTrans: new Date().toISOString(),
          usuarioFK: 1 // Troque para o ID do usuário logado se necessário
        })
      })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao salvar transação');
        return res.json();
      })
      .catch(err => {
        console.error('Erro ao salvar transação:', err);
      });
    }

    // Envia cada valor como uma transação separada e só atualiza a tabela depois de todos os envios
    Promise.all([
      enviarTransacao('Total de Ganhos', ganhos, 'Receita'),
      enviarTransacao('Total de Gastos', gastos, 'Despesa'),
      enviarTransacao('Total Investido', investido, 'Investimento'),
      enviarTransacao('Lazer Disponível', lazer, 'Lazer')
    ]).then(() => {
      atualizarTabelaTransacoes();
      hideModal();
      console.log('Histórico de alterações:', historico);
    });
  };

  // Painel de mensagem informativa (simulação de mensagemId do backend)
  const mensagemId = 1; // 1, 2 ou 3
  function getMensagemPainel(id) {
    switch (id) {
      case 1:
        return "Você precisa melhorar sua vida financeira.";
      case 2:
        return "Você está no caminho, não desista para alcançar a liberdade financeira.";
      case 3:
        return "Parabéns, continue nesse caminho!!!";
      default:
        return "";
    }
  }
  const painelMensagem = $('painel-mensagem');
  if (painelMensagem) {
    painelMensagem.textContent = getMensagemPainel(mensagemId);
  }

  // Bindings
  if (btnEdit)      btnEdit.addEventListener('click', () => showModal('name'));
  if (btnEditStats) btnEditStats.addEventListener('click', () => showModal('stats'));
  if (btnClose)     btnClose.addEventListener('click', hideModal);
  if (btnSave)      btnSave.addEventListener('click', saveProfile);

  // Fecha clicando fora do modal
  if (modal && modalContent) {
    modal.addEventListener('click', e => {
      if (!modalContent.contains(e.target)) hideModal();
    });
  }

  // Fecha no ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && modal.classList.contains('d-flex')) hideModal();
  });

  // Atualiza a tabela ao carregar a página
  atualizarTabelaTransacoes();
});