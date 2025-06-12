/*  cadastro.js
 *  – Valida o formulário de cadastro
 *  – Exibe alertas simples e redireciona em caso de sucesso
 */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('signup-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateSignup()) {
      /* redireciona após cadastro simulado */
      window.location.href = '../Home/Home.html';
    }
  });

  /* ===== Funções de validação ===== */
  function validateSignup() {
    const name            = form.name.value.trim();
    const email           = form.email.value.trim();
    const password        = form.password.value.trim();
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

    /* você pode enviar dados para o servidor aqui */
    alert('Cadastro realizado com sucesso!');
    return true;
  }
});
