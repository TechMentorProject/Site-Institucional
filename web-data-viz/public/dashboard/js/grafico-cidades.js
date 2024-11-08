var ufs = ['RJ', 'SP', 'MG', 'ES']

// buscarAntenasPorEstado()
// async function buscarAntenasPorEstado(uf) {
//     return fetch(`/estacoes/pegarAntenasPorEstado/${uf}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         }
//     })
//         .then(resposta => resposta.json())
//         .then(res => res.qtdAntenasPorEstado)
//         .catch(error => {
//             console.log(`#ERRO ao buscar antenas: ${error}`);
//             return null;
//         });
// }

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

}