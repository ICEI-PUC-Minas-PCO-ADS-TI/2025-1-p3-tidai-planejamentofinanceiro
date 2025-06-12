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

    // Se o email contiver "admin", redireciona para a página do administrador
    if (email.includes("admin")) {
      console.log("Email com 'admin' detectado, redirecionando para AlterarA.html");
      window.location.href = "../Alterar Administrador/AlterarA.html";
      return;
    }

    // Caso contrário, segue com login normal
    fetch('http://localhost:5284/Usuario')
      .then(response => response.json())
      .then(usuarios => {
        const usuario = usuarios.find(u =>
          u.emailUsuario.toLowerCase() === email && u.senhaUsuario === senha
        );

        if (!usuario) {
          alert('Usuário ou senha inválidos.');
          return;
        }

        // Salva o email e o ID do usuário logado no localStorage para uso posterior
        localStorage.setItem('usuarioLogadoEmail', usuario.emailUsuario);
        localStorage.setItem('usuarioLogadoId', usuario.idUsuario);

        window.location.href = "../Página do Usuario/Usuario.html";
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error);
        alert('Erro ao tentar logar.');
      });
  });
});