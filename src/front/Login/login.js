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

    // Buscar usuário na API
    console.log('🔍 Buscando usuários na API...');
    
    fetch('http://localhost:5284/Usuario')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(usuarios => {
        console.log('📋 Usuários retornados da API:', usuarios);
        
        // Verificar se usuarios é um array
        if (!Array.isArray(usuarios)) {
          throw new Error('Resposta da API não é um array válido');
        }

        // Procurar usuário com email e senha correspondentes
        const usuario = usuarios.find(u => {
          console.log(`🔍 Verificando usuário: ${u.emailUsuario} vs ${email}`);
          return u.emailUsuario && u.emailUsuario.toLowerCase() === email && 
                 u.senhaUsuario && u.senhaUsuario === senha;
        });

        if (!usuario) {
          console.log('❌ Usuário não encontrado com essas credenciais');
          alert('Usuário ou senha inválidos.');
          return;
        }

        console.log('✅ Usuário encontrado:', usuario);
        console.log('🆔 ID do usuário:', usuario.idUsuario);

        // IMPORTANTE: Armazenar TODOS os dados do usuário
        const dadosUsuario = {
          idUsuario: usuario.idUsuario,
          nomeUsuario: usuario.nomeUsuario,
          emailUsuario: usuario.emailUsuario,
          senhaUsuario: usuario.senhaUsuario, // Manter para futuras atualizações
          endividado: usuario.endividado
        };

        // Salvar no sessionStorage (recomendado para sessão atual)
        sessionStorage.setItem('usuarioLogado', JSON.stringify(dadosUsuario));
        
        // Backup no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(dadosUsuario));

        console.log('💾 Dados salvos no storage:', dadosUsuario);
        console.log('🔄 Redirecionando para página do usuário...');

        // Redirecionar para página do usuário
        window.location.href = "../Perfil Usuario/PerfilU.html";
      })
      .catch(error => {
        console.error('❌ Erro detalhado:', error);
        
        // Verificar se é erro de conexão
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          alert('❌ Erro de conexão: Verifique se a API está rodando em http://localhost:5284');
        } else if (error.message.includes('HTTP: 404')) {
          alert('❌ Endpoint não encontrado: Verifique se a rota /Usuario está correta na API');
        } else if (error.message.includes('HTTP: 500')) {
          alert('❌ Erro interno do servidor: Verifique os logs da API');
        } else {
          alert(`❌ Erro ao tentar logar: ${error.message}`);
        }
        
        // Para debug - tentar acessar diretamente a API
        console.log('🔧 Tentando acessar API diretamente...');
        console.log('URL da API:', 'http://localhost:5284/Usuario');
      });
  });

  // Função de debug para testar API
  window.testarAPI = function() {
    console.log('🧪 Testando conexão com API...');
    
    fetch('http://localhost:5284/Usuario')
      .then(response => {
        console.log('📡 Status da resposta:', response.status);
        console.log('📡 Headers:', response.headers);
        return response.json();
      })
      .then(data => {
        console.log('✅ API funcionando! Dados retornados:', data);
        alert('✅ API está funcionando! Verifique o console para detalhes.');
      })
      .catch(error => {
        console.error('❌ Erro na API:', error);
        alert('❌ Erro na API: ' + error.message);
      });
  };

  // Para debug - adicionar botão de teste (opcional)
  const debugBtn = document.createElement('button');
  debugBtn.textContent = 'Testar API';
  debugBtn.onclick = window.testarAPI;
  debugBtn.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;background:#007bff;color:white;border:none;padding:10px;border-radius:5px;';
  document.body.appendChild(debugBtn);
});