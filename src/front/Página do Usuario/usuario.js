document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const usuarioId = usuario?.idUsuario;
  if (!usuarioId) return;

  fetch("http://localhost:5284/Transacao", {
    method: "GET",
    credentials: "include"
  })
  .then(res => res.json())
  .then(transacoes => {
    const doUsuario = transacoes.filter(t => t.usuarioFK === usuarioId);

    let ganhos = 0, gastos = 0, investidos = 0;

    doUsuario.forEach(t => {
      const valor = parseFloat(t.valorTrans);
      if (t.descricaoCont === "Total de Ganhos") ganhos += valor;
      else if (t.descricaoCont === "Total de Gastos") gastos += valor;
      else if (t.descricaoCont === "Total Investido") investidos += valor;
    });

    const saldo = ganhos - gastos - investidos;

    // Atualiza os cards
    document.getElementById("saldoAtual").textContent = saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("investimentos").textContent = investidos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("gastosMes").textContent = gastos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  })
  .catch(err => {
    console.error("Erro ao carregar transações:", err);
  });
});

document.getElementById('btn-sair').addEventListener('click', function() {
  localStorage.clear();
  window.location.href = 'CAMINHO_PARA_LOGIN_OU_HOME.html';
});