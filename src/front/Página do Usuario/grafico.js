document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("grafico-transacoes").getContext("2d");

  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    datasets: [
      {
        label: "Transações",
        data: [5000, 3000, 4500, 6000, 7000],
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
