var ufs = ['RJ', 'SP', 'MG', 'ES']

buscarAntenasPorEstado()
async function buscarAntenasPorEstado() {
    var antenasEstados = []

    for (var i = 0; i < ufs.length; i++) {
        fetch(`/estacoes/pegarAntenasPorEstado/${ufs[i]}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((resposta) => {
                resposta.json().then((res) => {
                    console.log(`Consulta de antenas pelo estado ${ufs[i]}!`);
                    antenasEstados.push(res.qtdAntenasPorEstado);
                })
            })
            .catch((erro) => {
                console.log(`#ERRO: ${erro}`);
            });
        if ((i + 1) == ufs.length) {
            criarGrafico(antenasEstados)
        }
    }
}



const estadoDados = {
    "Rio de Janeiro": {
        cobertura: "57%",
        operadora: "Operadora Tim",
        crescimento: "Crescimento de 1.2%",
        color: "rgba(255, 99, 132, 0.7)",
    },
    "São Paulo": {
        cobertura: "71%",
        operadora: "Operadora Oi",
        crescimento: "Crescimento de 2.5%",
        color: "rgba(54, 162, 235, 0.7)",
    },
    "Minas Gerais": {
        cobertura: "42%",
        operadora: "Operadora Vivo",
        crescimento: "Crescimento de 1.8%",
        color: "rgba(75, 192, 192, 0.7)",
    },
    "Espírito Santo": {
        cobertura: "34%",
        operadora: "Operadora Claro",
        crescimento: "Crescimento de 0.9%",
        color: "rgba(153, 102, 255, 0.7)",
    },
};

function updateCards(label) {
    const data = estadoDados[label];
    const cardOneFront = document.getElementById("card1-front");
    const cardOneBack = document.getElementById("card1-back");
    const cardTwoFront = document.getElementById("card2-front");
    const cardTwoBack = document.getElementById("card2-back");
    const cardThreeFront = document.getElementById("card3-front");
    const cardThreeBack = document.getElementById("card3-back");

    cardOneBack.querySelector(
        ".card-back p"
    ).innerText = `${label} cobre ${data.cobertura}`;
    cardTwoBack.querySelector(
        ".card-back p"
    ).innerText = `${data.operadora} é a líder em ${label}`;
    cardThreeBack.querySelector(
        ".card-back p"
    ).innerText = `${data.crescimento} de crescimento em ${label}`;

    cardOneFront.style.backgroundColor = data.color;
    cardOneBack.style.backgroundColor = data.color;
    cardTwoFront.style.backgroundColor = data.color;
    cardTwoBack.style.backgroundColor = data.color;
    cardThreeFront.style.backgroundColor = data.color;
    cardThreeBack.style.backgroundColor = data.color;
}

function criarGrafico(antenasEstados) {
    const ctx = document.getElementById("myChart");

    const myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                "Rio de Janeiro",
                "São Paulo",
                "Minas Gerais",
                "Espírito Santo",
            ],
            datasets: [
                {
                    label: "Quantidade antenas por estado",
                    data: antenasEstados,
                    borderWidth: 2,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.7)",
                        "rgba(54, 162, 235, 0.7)",
                        "rgba(75, 192, 192, 0.7)",
                        "rgba(153, 102, 255, 0.7)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                    ],
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    display: false,
                }
            },
            onClick: function (evt, element) {
                if (element.length > 0) {
                    const index = element[0].index;
                    const label = myChart.data.labels[index];
                    updateCards(label);
                }
            },
        },
    });
}