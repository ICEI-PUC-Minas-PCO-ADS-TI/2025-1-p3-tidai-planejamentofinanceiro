document.addEventListener('DOMContentLoaded', function () {
    // Função para buscar dados do backend
    fetch('http://localhost:5284/Usuario', { // ajuste a URL conforme seu backend
        method: 'GET',
        credentials: 'include' // se precisar de cookies/sessão
    })
    .then(response => response.json())
    .then(data => {
        // Atualiza os cards
        document.querySelector('.card-body .display-6.text-success.mb-0').textContent = `R$ ${data.saldoAtual}`;
        document.querySelectorAll('.card-body .display-6.text-success.mb-0')[1].textContent = `R$ ${data.investimentos}`;
        document.querySelector('.card-body .display-6.text-danger.mb-0').textContent = `R$ ${data.gastosMes}`;

        // Atualiza as transações
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        data.transacoes.forEach(transacao => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${transacao.data}</td>
                <td class="d-none d-md-table-cell">${transacao.descricao}</td>
                <td class="${transacao.tipo === 'Receita' ? 'text-success' : 'text-danger'} fw-bold">
                    ${transacao.tipo === 'Receita' ? '+' : '-'}R$ ${transacao.valor}
                </td>
                <td class="d-none d-sm-table-cell">${transacao.tipo}</td>
            `;
            tbody.appendChild(tr);
        });
        // Aqui você pode atualizar o gráfico também, se for dinâmico
    })
    .catch(error => {
        console.error('Erro ao buscar dados do dashboard:', error);
    });

    // Expansão do gráfico ao clicar
    const grafico = document.querySelector('.ratio img');
    grafico.style.cursor = 'pointer';
    grafico.addEventListener('click', function () {
        // Cria um modal simples para exibir o gráfico expandido
        let modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = 0;
        modal.style.left = 0;
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = 9999;
        modal.innerHTML = `
            <img src="${grafico.src}" alt="Gráfico Expandido" style="max-width:90vw; max-height:90vh; border-radius:12px; box-shadow:0 0 24px #000;">
            <span style="position:absolute;top:30px;right:50px;font-size:2.5rem;color:#fff;cursor:pointer;" id="fecharModal">&times;</span>
        `;
        document.body.appendChild(modal);
        document.getElementById('fecharModal').onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    });

    document.getElementById('formTransacao').addEventListener('submit', async function (e) {
        e.preventDefault();

        // Pegue os valores dos campos do formulário
        const descricao = document.getElementById('descricao').value;
        const valorTransacao = parseFloat(document.getElementById('valorTransacao').value);
        const tipo = document.getElementById('tipo').value;
        const dataTransacao = document.getElementById('dataTransacao').value;
        const usuarioId = null; // TODO: recupere o ID do usuário autenticado
        const isAdmin = false;  // TODO: recupere se o usuário é admin

        try {
            const response = await fetch('http://localhost:5284/Transacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // se precisar de cookies/sessão
                body: JSON.stringify({
                    DescricaoCont: descricao,
                    ValorTrans: valorTransacao,
                    TipoTrans: tipo,
                    DataTrans: dataTransacao,
                    UsuarioFk: usuarioId,
                    isAdmin: isAdmin
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || 'Erro ao realizar transação');
            }

            const data = await response.json();
            console.log('Transacao realizada com sucesso:', data);
            alert('Transação realizada com sucesso!');
            window.location.href = '../Home/PerfilU.html';
        } catch (error) {
            console.error('Erro no cadastro:', error.message);
            alert('Erro no cadastro: ' + error.message);
        }
    });
});