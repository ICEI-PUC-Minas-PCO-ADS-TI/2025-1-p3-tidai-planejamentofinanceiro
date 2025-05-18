/*function validateSignup() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (password.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres.");
        return false;
    }

    const numberRegex = /\d/;
    if (!numberRegex.test(password)) {
        alert("A senha deve conter pelo menos um número.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return false;
    }

    return true;
}


document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateSignup()) {
        window.location.href = "../Home/Home.html";
    }  */

    ///Conexão com a API
    document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

  //  if (!validateSignup()) {
     //   return;
    //}

    const formData = {
        nome: document.getElementById('name').value,
        email: document.getElementById('email').value,
        senhaHash: document.getElementById('password').value
    };

    const API_BASE_URL = 'http://localhost:5284/Usuario';
    // const API_BASE_URL = 'https://api.example.com'; // URL da sua API

    fetch(`${API_BASE_URL}/Usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text || "Erro desconhecido do servidor.");
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("Resposta da API:", data);

        if (data.id || data.usuarioId) {
            alert(`Usuário criado com sucesso!`);
            window.location.href = "../Home/Home.html";
        } else {
            alert("Erro ao criar usuário. Nenhum ID retornado.");
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao salvar os dados do usuário: ' + (error.message || error));
    });
});
