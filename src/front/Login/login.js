document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const senha = document.getElementById('password').value;

    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    if (email.includes("admin")) {
      window.location.href = "../Alterar Administrador/AlterarA.html";
      return;
    }

    fetch('http://localhost:5284/Usuario')
      .then(response => {
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        return response.json();
      })
      .then(usuarios => {
        if (!Array.isArray(usuarios)) throw new Error('Resposta da API não é um array válido');

        const usuario = usuarios.find(u =>
          u.emailUsuario?.toLowerCase() === email && u.senhaUsuario === senha
        );

        if (!usuario) {
          alert('Usuário ou senha inválidos.');
          return;
        }

        const dadosUsuario = {
          idUsuario: usuario.idUsuario,
          nomeUsuario: usuario.nomeUsuario,
          emailUsuario: usuario.emailUsuario,
          senhaUsuario: usuario.senhaUsuario,
          endividado: usuario.endividado
        };

        sessionStorage.setItem('usuarioLogado', JSON.stringify(dadosUsuario));
        localStorage.setItem('usuarioLogado', JSON.stringify(dadosUsuario));

        window.location.href = "../Perfil Usuario/PerfilU.html";
      })
      .catch(error => {
        console.error('Erro ao logar:', error);
        alert(`Erro: ${error.message}`);
      });
  });
});

document.getElementById('btn-sair').addEventListener('click', function() {
  localStorage.clear();
  window.location.href = 'CAMINHO_PARA_LOGIN_OU_HOME.html';
});