function validateLogin() {
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;

    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return false;
    }

   
    const adminLogin = {
        email: "admin@example.com",
        password: "admin123"
    };

    const userLogin = {
        email: "usuario@example.com",
        password: "usuario123"
    };

    if (email === adminLogin.email && password === adminLogin.password) {
        window.location.href = "../Alterar Administrador/AlterarA.HTML";
        return false; 
    } else if (email === userLogin.email && password === userLogin.password) {
        window.location.href = "../Página do Usuario/Usuario.html";
        return false; 
    } else {
        alert("Email ou senha incorretos.");
        return false;
    }
}

document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); 
    validateLogin();
});
