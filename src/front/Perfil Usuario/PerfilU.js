document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);

  // Função utilitária para formatar valores em Real
  function formatarReal(valor) {
    const num = typeof valor === 'number' ? valor : parseFloat(String(valor).replace(/\./g, '').replace(',', '.'));
    if (isNaN(num)) return 'R$ 0,00';
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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

  // Função para obter o ID do usuário logado
  function getUsuarioLogadoId() {
    return localStorage.getItem('usuarioLogadoId');
  }

  // BUSCA DADOS DO USUÁRIO E DAS ESTATÍSTICAS DIRETO DA API
  async function carregarPerfil() {
    try {
      const usuarioId = getUsuarioLogadoId();
      if (!usuarioId) return;
      const res = await fetch(`http://localhost:5284/Usuario/${usuarioId}`, { method: 'GET', credentials: 'include' });
      const data = await res.json();

      // Preenche perfil
      spanName.textContent   = data.nomeUsuario || 'Usuário';
      // Os campos abaixo são apenas visuais, não persistem no backend
      spanAge.textContent    = localStorage.getItem('idadeUsuario') ? `${localStorage.getItem('idadeUsuario')} anos` : '';
      spanPeriod.textContent = localStorage.getItem('periodoUsuario') || '';

      // Preenche estatísticas (apenas visuais)
      totalGanhos.textContent     = formatarReal(localStorage.getItem('totalGanhos') ?? '0,00');
      totalGastos.textContent     = formatarReal(localStorage.getItem('totalGastos') ?? '0,00');
      totalInvestido.textContent  = formatarReal(localStorage.getItem('totalInvestido') ?? '0,00');
      lazerDisponivel.textContent = formatarReal(localStorage.getItem('lazerDisponivel') ?? '0,00');
    } catch (err) {
      console.error('Erro ao buscar dados do usuário:', err);
    }
  }

  // Função para abrir o modal preenchendo todos os campos
  function showModal(focusField = 'name') {
    inName.value      = spanName.textContent.trim();
    inAge.value       = localStorage.getItem('idadeUsuario') || '';
    inPeriod.value    = localStorage.getItem('periodoUsuario') || '';
    inGanhos.value    = localStorage.getItem('totalGanhos') || '';
    inGastos.value    = localStorage.getItem('totalGastos') || '';
    inInvestido.value = localStorage.getItem('totalInvestido') || '';
    inLazer.value     = localStorage.getItem('lazerDisponivel') || '';
    modal.classList.add('d-flex');
    if (focusField === 'stats') {
      inGanhos.focus();
    } else {
      inName.focus();
    }
  }

  const hideModal = () => { modal.classList.remove('d-flex'); };

  // Salva perfil direto na API (apenas os campos aceitos pelo backend)
  const saveProfile = async () => {
    const name      = inName.value.trim();
    const age       = inAge.value.trim();
    const period    = inPeriod.value.trim();
    const ganhos    = inGanhos.value.trim();
    const gastos    = inGastos.value.trim();
    const investido = inInvestido.value.trim();
    const lazer     = inLazer.value.trim();

    // Buscar o usuarioId do usuário logado
    const usuarioId = getUsuarioLogadoId();
    if (!usuarioId) {
      alert('Usuário não encontrado para atualizar!');
      return;
    }

    // Buscar o usuário original pelo ID
    let usuarioOriginal = null;
    try {
      const res = await fetch(`http://localhost:5284/Usuario/${usuarioId}`, { method: 'GET', credentials: 'include' });
      usuarioOriginal = await res.json();
    } catch {
      alert('Erro ao buscar usuário!');
      return;
    }

    // Monte o objeto apenas com os campos aceitos pela API
    const usuarioAtualizado = {
      idUsuario: Number(usuarioId),
      nomeUsuario: name,
      emailUsuario: usuarioOriginal.emailUsuario,
      senhaUsuario: usuarioOriginal.senhaUsuario,
      endividado: usuarioOriginal.endividado
    };

    try {
      await fetch(`http://localhost:5284/Usuario/${usuarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(usuarioAtualizado)
      });

      // Após atualizar o usuário, registre a transação
      await fetch('http://localhost:5284/Transacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          descricaoCont: 'Atualização de perfil',
          valorTrans: 0,
          tipoTrans: 'Perfil',
          dataTrans: new Date().toISOString(),
          usuarioFK: Number(usuarioId)
        })
      });

      // Atualiza a tela com o novo nome
      spanName.textContent = name || 'Usuário';

      // Salva os campos extras apenas no localStorage (não persistem no backend)
      localStorage.setItem('idadeUsuario', age);
      localStorage.setItem('periodoUsuario', period);
      localStorage.setItem('totalGanhos', ganhos);
      localStorage.setItem('totalGastos', gastos);
      localStorage.setItem('totalInvestido', investido);
      localStorage.setItem('lazerDisponivel', lazer);

      spanAge.textContent    = age ? `${age} anos` : '';
      spanPeriod.textContent = period || '';
      totalGanhos.textContent     = formatarReal(ganhos || '0,00');
      totalGastos.textContent     = formatarReal(gastos || '0,00');
      totalInvestido.textContent  = formatarReal(investido || '0,00');
      lazerDisponivel.textContent = formatarReal(lazer || '0,00');
    } catch (err) {
      alert('Erro ao salvar perfil na API!');
    }

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

  // Inicialização automática ao carregar a página
  (async function initPerfil() {
    await carregarPerfil();
  })();
});