document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);

  const spanName   = $('user-name');
  const spanAge    = $('user-age');
  const spanPeriod = $('user-period');

  const totalGanhos     = $('total-ganhos');
  const totalGastos     = $('total-gastos');
  const totalInvestido  = $('total-investido');
  const lazerDisponivel = $('lazer-disponivel');

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

  const formatarReal = valor => {
    const num = typeof valor === 'number' ? valor : parseFloat(String(valor).replace(/\./g, '').replace(',', '.'));
    if (isNaN(num)) return 'R$ 0,00';
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuario) {
    alert('Usuário não logado.');
    return;
  }

  // Carregar dados visuais
  function carregarPerfil() {
    spanName.textContent   = usuario.nomeUsuario || 'Usuário';
    spanAge.textContent    = localStorage.getItem('idadeUsuario') ? `${localStorage.getItem('idadeUsuario')} anos` : '';
    spanPeriod.textContent = localStorage.getItem('periodoUsuario') || '';

    totalGanhos.textContent     = formatarReal(localStorage.getItem('totalGanhos') ?? '0,00');
    totalGastos.textContent     = formatarReal(localStorage.getItem('totalGastos') ?? '0,00');
    totalInvestido.textContent  = formatarReal(localStorage.getItem('totalInvestido') ?? '0,00');
    lazerDisponivel.textContent = formatarReal(localStorage.getItem('lazerDisponivel') ?? '0,00');
  }

  // Abrir modal
  function showModal(focus = 'name') {
    inName.value      = spanName.textContent.trim();
    inAge.value       = localStorage.getItem('idadeUsuario') || '';
    inPeriod.value    = localStorage.getItem('periodoUsuario') || '';
    inGanhos.value    = localStorage.getItem('totalGanhos') || '';
    inGastos.value    = localStorage.getItem('totalGastos') || '';
    inInvestido.value = localStorage.getItem('totalInvestido') || '';
    inLazer.value     = localStorage.getItem('lazerDisponivel') || '';
    modal.classList.add('d-flex');
    (focus === 'stats' ? inGanhos : inName).focus();
  }

  const hideModal = () => modal.classList.remove('d-flex');

  const saveProfile = async () => {
    const name = inName.value.trim();
    const age = inAge.value.trim();
    const period = inPeriod.value.trim();
    const ganhos = inGanhos.value.trim();
    const gastos = inGastos.value.trim();
    const investido = inInvestido.value.trim();
    const lazer = inLazer.value.trim();

    const now = new Date().toISOString();

    const usuarioAtualizado = {
      ...usuario,
      nomeUsuario: name
    };

    try {
      await fetch(`http://localhost:5284/Usuario/${usuario.idUsuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioAtualizado)
      });

      const transacoes = [
        { descricaoCont: 'Total de Ganhos',   valorTrans: ganhos },
        { descricaoCont: 'Total de Gastos',   valorTrans: gastos },
        { descricaoCont: 'Total Investido',   valorTrans: investido },
        { descricaoCont: 'Lazer Disponível',  valorTrans: lazer }
      ];

      for (const trans of transacoes) {
        await fetch('http://localhost:5284/Transacao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...trans,
            tipoTrans: '',
            dataTrans: now,
            valorTrans: Number(trans.valorTrans.replace(/\./g, '').replace(',', '.')) || 0,
            usuarioFK: usuario.idUsuario
          })
        });
      }

      // Atualiza os dados locais
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
      localStorage.setItem('idadeUsuario', age);
      localStorage.setItem('periodoUsuario', period);
      localStorage.setItem('totalGanhos', ganhos);
      localStorage.setItem('totalGastos', gastos);
      localStorage.setItem('totalInvestido', investido);
      localStorage.setItem('lazerDisponivel', lazer);

      carregarPerfil();
      hideModal();
    } catch (err) {
      alert('❌ Erro ao salvar alterações.');
      console.error(err);
    }
  };

  // Eventos
  btnEdit     .addEventListener('click', () => showModal('name'));
  btnEditStats.addEventListener('click', () => showModal('stats'));
  btnClose    .addEventListener('click', hideModal);
  btnSave     .addEventListener('click', saveProfile);
  modal.addEventListener('click', e => { if (!modalContent.contains(e.target)) hideModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hideModal(); });

  carregarPerfil();
});
