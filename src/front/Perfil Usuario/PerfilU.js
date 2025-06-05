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

  // BUSCA DADOS DO USUÁRIO E DAS ESTATÍSTICAS
  fetch('http://localhost:5284/Usuario', { method: 'GET', credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      // Preenche perfil
      spanName.textContent   = data.nome || 'Usuário';
      spanAge.textContent    = data.idade ? `${data.idade} anos` : '';
      spanPeriod.textContent = data.periodo || '';

      // Preenche estatísticas
      totalGanhos.textContent     = `R$ ${data.totalGanhos ?? '0,00'}`;
      totalGastos.textContent     = `R$ ${data.totalGastos ?? '0,00'}`;
      totalInvestido.textContent  = `R$ ${data.totalInvestido ?? '0,00'}`;
      lazerDisponivel.textContent = `R$ ${data.lazerDisponivel ?? '0,00'}`;
    })
    .catch(err => console.error('Erro ao buscar dados do usuário:', err));

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

    totalGanhos.textContent     = `R$ ${ganhos || '0,00'}`;
    totalGastos.textContent     = `R$ ${gastos || '0,00'}`;
    totalInvestido.textContent  = `R$ ${investido || '0,00'}`;
    lazerDisponivel.textContent = `R$ ${lazer || '0,00'}`;

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
});