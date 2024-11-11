// validar()
let coberturas = [
    ['State', 'Value'],
    ['', 40],
    ['', 60],
    ['BR-ES', 50],
    ['BR-MG', 50],
    ['BR-RJ', 50],
    ['BR-SP', 50],
    ['BR-PR', 50],
    ['BR-SC', 50],
    ['BR-RS', 50],
    ['BR-MS', 50]
]
carregarGraficoMapa()

async function carregarGraficoMapa() {
    await google.charts.load('current', {
        'packages': ['geochart'],
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });
    await google.charts.setOnLoadCallback(drawRegionsMap(coberturas));
    await pegarCoberturas()
}

async function pegarCoberturas() {
    coberturas = [
        ['State', 'Value'],
        ['', 40],
        ['', 60],
        ['BR-ES', await pegarCobertura("ES")],
        ['BR-MG', await pegarCobertura("MG")],
        ['BR-RJ', await pegarCobertura("RJ")],
        ['BR-SP', await pegarCobertura("SP")],
        ['BR-PR', await pegarCobertura("PR")],
        ['BR-SC', await pegarCobertura("SC")],
        ['BR-RS', await pegarCobertura("RS")],
        ['BR-MS', await pegarCobertura("MS")]
    ]
    await google.charts.setOnLoadCallback(drawRegionsMap(coberturas));
}

async function pegarCobertura(uf) {
    return fetch(`/municipio/pegarCoberturaPercentualPorEstado/2023/${uf}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => Number(res.cobertura).toFixed(2))
        .catch(error => {
            console.log(`#ERRO ao buscar antenas: ${error}`);
            return null;
        });
}

async function drawRegionsMap(dados) {
    var data = await google.visualization.arrayToDataTable(dados);
    var options = {
        region: 'BR',
        resolution: 'provinces',
        displayMode: 'regions',
        colorAxis: { colors: ['#FF0000', '#EE7214', '#FDD04C', '#527853'] },
        backgroundColor: '#ffffff',
        datalessRegionColor: '#a5deff',
        keepAspectRatio: true,
        magnifyingGlass: { enable: true, zoomFactor: 7 },
        tooltip: { trigger: 'focus' }
    };

    var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
    chart.draw(data, options);

    // Função de seleção do estado
    await google.visualization.events.addListener(chart, 'select', function () {
        var selectedItem = chart.getSelection()[0];
        if (selectedItem) {
            state = data.getValue(selectedItem.row, 0); // Atualiza o estado selecionado
            onStateClick(state); // Passa o estado e a tecnologia selecionada
        }
    });
}


// Função para obter o nome do estado baseado no código
async function getEstadoNome(uf) {
    switch (uf) {
        case 'BR-ES': return 'Espírito Santo';
        case 'BR-MG': return 'Minas Gerais';
        case 'BR-RJ': return 'Rio de Janeiro';
        case 'BR-SP': return 'São Paulo';
        case 'BR-PR': return 'Paraná';
        case 'BR-SC': return 'Santa Catarina';
        case 'BR-RS': return 'Rio Grande do Sul';
        case 'BR-MS': return 'Mato Grosso do Sul';
        default: return 'Estado desconhecido';
    }
}


async function onStateClick(uf) {
    const estado = await getEstadoNome(uf)

    let populacoes = [
        1, 2
        // await pegarAumentoPopulacional(2025, estado),
        // await pegarAumentoPopulacional(2026, estado),
        // await pegarAumentoPopulacional(2027, estado),
        // await pegarAumentoPopulacional(2028, estado),
        // await pegarAumentoPopulacional(2029, estado),
        // await pegarAumentoPopulacional(2030, estado)
    ]
    let antenas = await pegarAntenas(uf.split("-")[1])
    let operadora = await pegarOperadora(uf.split("-")[1])
    console.log(antenas)

    alterarDados(estado, antenas, operadora, populacoes)
}

async function pegarAumentoPopulacional(ano, estado) {
    return fetch(`/populacao/pegarAumentoPopulacionalPercentual/${ano}/${estado}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => ({
            "ano": ano,
            "populacao": res.aumentoPercentual
        }))
        .catch(error => {
            console.log(`#ERRO ao buscar aumento populacional: ${error}`);
            return { "ano": ano, "populacao": null };
        });
}

async function pegarAntenas(uf) {
    console.log("antenas");
    return fetch(`/estacoesSMP/pegarAntenasPorEstado/${uf}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res.qtdAntenasPorEstado);
            return res.qtdAntenasPorEstado;
        })
        .catch(error => {
            console.log(`#ERRO ao buscar antenas: ${error}`);
            return null;
        });
}

async function pegarOperadora(uf) {
    return fetch(`/estacoesSMP/pegarMaiorOperadoraPorEstado/${uf}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => res.operadora)
        .catch(error => {
            console.log(`#ERRO ao buscar operadora: ${error}`);
            return null;
        });
}

function alterarDados(estado, antenas, operadora, populacoes) {
    let antenasTexto = antenas == null ? 'Dados de antenas inválidos' : `No estado ${estado}, existem ${antenas} antenas`;
    let operadoraTexto = operadora == null ? 'Dados de operadora inválidos' : `No estado ${estado}, a operadora com maior presença é a ${operadora}`;
    let populacaoTexto = populacoes[0].populacao == undefined ? 'Dados de população inválidos' : populacoes.map(p => `Porcentagem de aumento populacional para ${p.ano}: ${p.populacao}%\n`).join('');

    document.getElementById('antenas-estado').innerHTML = antenasTexto;
    document.getElementById('operadora-estado').innerHTML = operadoraTexto;
    document.getElementById('populacao-estado').innerHTML = populacaoTexto;
    document.getElementById('titulo-estado').innerHTML = "Estado: " + estado;
}