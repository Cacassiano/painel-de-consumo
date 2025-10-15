const data_light = [
    {
        label: "KW/h gastos",
        data: [25, 30, 17, 50, 5]
    }
]
const data_water = [
    {
        label: "Litros de água",
        data: [12, 20, 30, 3]
    }
]

const data_gas = [
    {
        label:"Kg de gás", 
        data: [50, 10, 2]
    }
]
const options = {
    responsive: true,
    animation: {
        animateScale: true,
        duration: 1500, // 1.5 segundos
        easing: 'easeOutQuart',
        animateRotate: true     
    },
    plugins: {
        legend: {
            position: "right"
        },
        title: {
            display: true,
            text: "Gastos do mês"
        }
    }
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("show")
        } else {
            entry.target.classList.remove("show")
        }
    })
}, {
    rootMargin: "0% 0% 0% 70%",
    threshold: 0.1
})

document.querySelectorAll(".card-summary")
    .forEach(e => observer.observe(e))

const g_light = document.getElementById("g_light")
const g_water = document.getElementById("g_water")
const g_gas = document.getElementById("g_gas")
const g_summary = document.getElementById("g_summary");

new Chart(g_light, {
    type: "pie",
    data: {
        labels: ['Luzes Domésticas', 'Eletrodomésticos', 'Televisão', "Ar-condicionado", "Outros"],
        datasets: data_light
    },
    options: options
})
new Chart(g_water, {
    type:"pie",
    data: {
        labels: ["Lava-louça", "Banho", "Maquina de lavar", "Outros"],
        datasets: data_water
    },
    options: options
})

new Chart(g_gas, {
    type: "pie",
    data: {
        labels: ["Cozinha", "Aquecedor", "Outros"],
        datasets: data_gas
    },
    options: options
})

summary_chart = new Chart(g_summary, {
    type: "bar",
    data: {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        datasets: [
            {
                label: "KW/h gastos",   
                data: [25, 30, 67, 50, 40, 60, 75, 72, 84, 90, 102, 127],
            }
        ]
    },
    options: options
})


document.getElementById("isummary").addEventListener("input", (e) => {
  let dataset;

  if (e.target.value == "light") {
    dataset = [25, 30, 67, 50, 40, 60, 75, 72, 84, 90, 102, 127];
    summary_chart.data.datasets[0].label = "KW/h gastos";
  } else if (e.target.value == "water") {
    dataset = [120, 200, 150, 80, 70, 110, 130, 170, 160, 180, 220, 240];
    summary_chart.data.datasets[0].label = "Litros de água";
  } else {
    dataset = [50, 10, 2, 5, 8, 12, 15, 18, 20, 22, 25, 30];
    summary_chart.data.datasets[0].label = "Kg de gás";
  }

  summary_chart.data.datasets[0].data = dataset;
  summary_chart.update(); 
});
