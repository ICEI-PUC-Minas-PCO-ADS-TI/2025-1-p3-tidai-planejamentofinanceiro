
document.addEventListener("DOMContentLoaded", async function () {
  const ctx = document.getElementById("grafico-transacoes").getContext("2d");

  // Recupera o ID do usuário logado
  const usuarioId = localStorage.getItem('usuarioLogadoId');
  if (!usuarioId) {
    alert("Usuário não identificado!");
    return;
  }

  // Busca as transações do usuário na API
  let transacoes = [];
  try {
    const res = await fetch('http://localhost:5284/Transacao', { credentials: 'include' });
    const todasTransacoes = await res.json();
    // Filtra só as do usuário logado
    transacoes = todasTransacoes.filter(t => t.usuarioFK == usuarioId);
  } catch (err) {
    alert("Erro ao buscar transações!");
    return;
  }

  // Agrupa por mês/ano e soma os valores
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio",
    "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Objeto para somar valores por mês/ano
  const somaPorMes = {};

  transacoes.forEach(t => {
    if (!t.dataTrans) return;
    const data = new Date(t.dataTrans);
    const chave = `${meses[data.getMonth()]}/${data.getFullYear()}`;
    somaPorMes[chave] = (somaPorMes[chave] || 0) + (Number(t.valorTrans) || 0);
  });

  // Ordena por data
  const labels = Object.keys(somaPorMes);
  labels.sort((a, b) => {
    const [mesA, anoA] = a.split('/');
    const [mesB, anoB] = b.split('/');
    const idxA = meses.indexOf(mesA);
    const idxB = meses.indexOf(mesB);
    if (anoA !== anoB) return Number(anoA) - Number(anoB);
    return idxA - idxB;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Transações",
        data: labels.map(l => somaPorMes[l]),
        backgroundColor: "#28a745",
        borderRadius: 5,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Transações por Mês'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
});