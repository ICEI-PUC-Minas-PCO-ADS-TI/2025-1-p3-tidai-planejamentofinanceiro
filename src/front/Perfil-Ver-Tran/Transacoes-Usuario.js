document.addEventListener('DOMContentLoaded', async () => {
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

  const btnChangeAvatar = $('changeAvatar');
  const inputAvatar = $('avatarInput');
  const avatarImg = $('admin-avatar');

  const API_URL = 'http://localhost:5284';

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

    const avatarSalvo = localStorage.getItem('avatarUsuario');
    if (avatarSalvo) avatarImg.src = avatarSalvo;
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

  // 🛠️ Função para buscar transações do usuário atual
  async function buscarTransacoes() {
    const res = await fetch(`${API_URL}/Transacao`);
    const todas = await res.json();
    return todas.filter(t => t.usuarioFK === usuario.idUsuario);
  }

  // 🔥 Salvar perfil e transações
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
      // Atualizar nome do usuário no backend
      await fetch(`${API_URL}/Usuario/${usuario.idUsuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioAtualizado)
      });

      // Buscar transações existentes
      const transacoesExistentes = await buscarTransacoes();

      const categorias = [
        { descricao: 'Salário Atual',   valor: ganhos },
        { descricao: 'Gastos no Mês',   valor: gastos },
        { descricao: 'Quanto Quer Investir', valor: investido },
        { descricao: 'Lazer',            valor: lazer }
      ];

      // Para cada categoria, atualiza ou cria
      for (const cat of categorias) {
        const existente = transacoesExistentes.find(t => t.descricaoCont === cat.descricao);

        const corpo = {
          descricaoCont: cat.descricao,
          tipoTrans: '',
          dataTrans: now,
          valorTrans: parseFloat(cat.valor.replace(/\./g, '').replace(',', '.')) || 0,
          usuarioFK: usuario.idUsuario
        };

        if (existente) {
          // Se existe, atualiza (PUT)
          await fetch(`${API_URL}/Transacao/${existente.idTrans}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...existente, ...corpo })
          });
        } else {
          // Se não, cria (POST)
          await fetch(`${API_URL}/Transacao`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(corpo)
          });
        }
      }

      // Atualiza LocalStorage
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
      localStorage.setItem('idadeUsuario', age);
      localStorage.setItem('periodoUsuario', period);
      localStorage.setItem('totalGanhos', ganhos);
      localStorage.setItem('totalGastos', gastos);
      localStorage.setItem('totalInvestido', investido);
      localStorage.setItem('lazerDisponivel', lazer);

      carregarPerfil();
      hideModal();

      alert('✅ Dados atualizados com sucesso!');
    } catch (err) {
      alert('❌ Erro ao salvar alterações.');
      console.error(err);
    }
  };

  // 🖼️ Evento para trocar o avatar
  btnChangeAvatar?.addEventListener('click', () => {
    inputAvatar.click();
  });

  inputAvatar?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      avatarImg.src = reader.result;
      localStorage.setItem('avatarUsuario', reader.result);
    };
    reader.readAsDataURL(file);
  });

  // 🔗 Eventos dos botões
  btnEdit     .addEventListener('click', () => showModal('name'));
  btnEditStats.addEventListener('click', () => showModal('stats'));
  btnClose    .addEventListener('click', hideModal);
  btnSave     .addEventListener('click', saveProfile);

  modal.addEventListener('click', e => {
    if (!modalContent.contains(e.target)) hideModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideModal();
  });

  carregarPerfil();
});
