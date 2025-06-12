document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateSignup(form)) return;

    // Dados do formulário
    const nome = form.name.value.trim();
    const email = form.email.value.trim();
    const senha = form.password.value.trim();

    try {
      const response = await fetch('http://localhost:5284/Usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nomeUsuario: nome,
          emailUsuario: email,
          senhaUsuario: senha,
          endividado: false // ou true, conforme sua lógica
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Erro ao cadastrar');
      }

      const data = await response.json();
      console.log('Usuário cadastrado com sucesso:', data);
      alert('Cadastro realizado com sucesso!');
      window.location.href = '../Home/Home.html';
    } catch (error) {
      console.error('Erro no cadastro:', error.message);
      alert('Erro no cadastro: ' + error.message);
    }
  });

  // Validação do formulário
  function validateSignup(form) {
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

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return false;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return false;
    }

    return true;
  }
});