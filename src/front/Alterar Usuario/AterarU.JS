document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);

  // Elementos da página
  const spanName = $('user-name'); // Mostra nome atual
  const profileImg = $('profileImage');
  const inputImage = $('imageInput');
  const btnChangeImage = $('changeImage');
  const btnSave = $('saveChanges');
  const inputName = $('newName');
  const inputPass = $('newPassword');
  const inputConfirm = $('confirmPassword');

  // Histórico de alterações
  const historico = [];

  // Trocar imagem de perfil com preview
  if (btnChangeImage && inputImage && profileImg) {
    btnChangeImage.addEventListener('click', () => {
      inputImage.click();
    });

    inputImage.addEventListener('change', function () {
      const file = this.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          profileImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Função para salvar alterações
  function salvarAlteracoes() {
    const novoNome = inputName?.value.trim();
    const novaSenha = inputPass?.value.trim();
    const confirmar = inputConfirm?.value.trim();

    if (!novoNome && !novaSenha) {
      alert('Preencha ao menos um campo para atualizar.');
      return;
    }

    if (novaSenha && novaSenha !== confirmar) {
      alert('As senhas não coincidem!');
      return;
    }

    // Armazena o histórico
    historico.push({
      nomeAnterior: spanName.textContent,
      nomeNovo: novoNome || '(sem alteração)',
      senhaAlterada: !!novaSenha,
      dataHora: new Date().toLocaleString()
    });

    // Atualiza visualmente o nome
    if (novoNome) spanName.textContent = novoNome;

    // Monta o payload para envio
    const payload = {
      nome: novoNome || null,
      senha: novaSenha || null
    };

    // Envia para API (ajuste o endpoint conforme seu backend)
    fetch('http://localhost:5284/Usuario/AtualizarPerfil', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao salvar perfil');
        return response.json();
      })
      .then(data => {
        alert('Perfil atualizado com sucesso!');
        console.log('Resposta do servidor:', data);
      })
      .catch(error => {
        console.error('Erro na atualização:', error);
        alert('Erro ao atualizar o perfil.');
      });

    console.log('Histórico de alterações:', historico);
  }

  // Evento salvar
  if (btnSave) btnSave.addEventListener('click', salvarAlteracoes);
});
