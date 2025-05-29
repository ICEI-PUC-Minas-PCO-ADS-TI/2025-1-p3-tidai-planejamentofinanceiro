document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
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

    // Busca todos os usuários (NÃO recomendado para produção!)
    fetch('http://localhost:5284/Usuario')
      .then(response => response.json())
      .then(usuarios => {
        // Procura usuário com email e senha correspondentes
        const usuario = usuarios.find(u =>
          u.emailUsuario === email && u.senhaUsuario === senha
        );

  if (
  usuario.isAdmin === true ||
  usuario.tipo === 'admin' ||
  usuario.nomeUsuario?.toLowerCase() === 'admin'
) {
  window.location.href = "../Alterar Administrador/AlterarA.html";
} else {
  window.location.href = "../Página do Usuario/Usuario.html";
}
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error);
        alert('Erro ao tentar logar.');
      });
  });
});