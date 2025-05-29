document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (validateSignup()) {
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value.trim();

      try {
        const response = await fetch('http://localhost:5284/usuario', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // ...dentro do fetch...
          body: JSON.stringify({
            nomeUsuario: name,
            emailUsuario: email,
            senhaUsuario: password
          })
        });

        if (response.ok) {
          alert('Cadastro realizado com sucesso!');
          window.location.href = '../Home/Home.html';
        } else {
          let errorMsg = 'Erro ao cadastrar usuário.';
          try {
            const errorData = await response.json();
            errorMsg += ' ' + (errorData.message || response.statusText);
          } catch {
            errorMsg += ' (Resposta inesperada do servidor)';
          }
          alert(errorMsg);
        }
      } catch (error) {
        alert('Erro ao cadastrar usuário: ' + error.message);
      }
    }
  });

  function validateSignup() {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form['confirm-password'].value.trim();

    if (!name || !email || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      return false;
    }
    if (password.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres.');
      return false;
    }
    if (!/\d/.test(password)) {
      alert('A senha deve conter pelo menos um número.');
      return false;
    }
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return false;
    }
    return true;
  }
});