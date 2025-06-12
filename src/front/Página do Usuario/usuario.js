document.addEventListener('DOMContentLoaded', function () {
    // Função para buscar dados do backend
    fetch('http://localhost:5284/Transacao', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(transacoes => {
        // Cria a tabela se não existir
        let tabelaTransacoes = document.getElementById('tabela-transacoes');
        if (!tabelaTransacoes) {
            tabelaTransacoes = document.createElement('table');
            tabelaTransacoes.id = 'tabela-transacoes';
            tabelaTransacoes.className = 'table table-striped mt-4';
            tabelaTransacoes.innerHTML = `
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            // Insere a tabela no final do main, ajuste se quiser outro local
            const main = document.querySelector('main');
            if (main) main.appendChild(tabelaTransacoes);
            else document.body.appendChild(tabelaTransacoes);
        }
        const tbody = tabelaTransacoes.querySelector('tbody');
        tbody.innerHTML = '';
        transacoes.forEach(transacao => {
            let tipo = (transacao.tipoTrans || '').toLowerCase();
            let cor = '';
            let sinal = '';
            if (tipo === 'receita') {
                cor = 'text-success';
                sinal = '+';
            } else if (tipo === 'despesa') {
                cor = 'text-danger';
                sinal = '-';
            } else if (tipo === 'investimento') {
                cor = 'text-info';
                sinal = '';
            } else if (tipo === 'lazer') {
                cor = 'text-secondary';
                sinal = '';
            }
            const valorFormatado = `R$ ${Number(transacao.valorTrans).toFixed(2)}`;
            const tipoExibicao = transacao.tipoTrans && transacao.tipoTrans.trim() !== '' ? transacao.tipoTrans : '-';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${new Date(transacao.dataTrans).toLocaleDateString('pt-BR')}</td>
                <td>${transacao.descricaoCont}</td>
                <td class="${cor} fw-bold">${sinal}${valorFormatado}</td>
                <td>${tipoExibicao}</td>
            `;
            tbody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar transações:', error);
    });

    // NÃO ALTERADO: Expansão do gráfico ao clicar
    const grafico = document.querySelector('.ratio img');
    if (grafico) {
        grafico.style.cursor = 'pointer';
        grafico.addEventListener('click', function () {
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
    }
});