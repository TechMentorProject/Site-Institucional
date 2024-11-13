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
    ['BR-RS', 50]
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
        // ['BR-AC', await pegarCobertura("Acre")],
        // ['BR-AL', await pegarCobertura("Alagoas")],
        // ['BR-AP', await pegarCobertura("Amapá")],
        // ['BR-AM', await pegarCobertura("Amazonas")],
        // ['BR-BA', await pegarCobertura("Bahia")],
        // ['BR-CE', await pegarCobertura("Ceará")],
        // ['BR-DF', await pegarCobertura("Distrito Federal")],
        ['BR-ES', await pegarCobertura("Espírito Santo")],
        // ['BR-GO', await pegarCobertura("Goiás")],
        // ['BR-MA', await pegarCobertura("Maranhão")],
        // ['BR-MT', await pegarCobertura("Mato Grosso")],
        // ['BR-MS', await pegarCobertura("Mato Grosso do Sul")],
        ['BR-MG', await pegarCobertura("Minas Gerais")],
        // ['BR-PA', await pegarCobertura("Pará")],
        // ['BR-PB', await pegarCobertura("Paraíba")],
        ['BR-PR', await pegarCobertura("Paraná")],
        // ['BR-PE', await pegarCobertura("Pernambuco")],
        // ['BR-PI', await pegarCobertura("Piauí")],
        ['BR-RJ', await pegarCobertura("Rio de Janeiro")],
        // ['BR-RN', await pegarCobertura("Rio Grande do Norte")],
        ['BR-RS', await pegarCobertura("Rio Grande do Sul")],
        // ['BR-RO', await pegarCobertura("Rondônia")],
        // ['BR-RR', await pegarCobertura("Roraima")],
        ['BR-SC', await pegarCobertura("Santa Catarina")],
        ['BR-SP', await pegarCobertura("São Paulo")]
        // ['BR-SE', await pegarCobertura("Sergipe")],
        // ['BR-TO', await pegarCobertura("Tocantins")]
    ]
    await google.charts.setOnLoadCallback(drawRegionsMap(coberturas));
}

async function pegarCobertura(estado) {
    return fetch(`/municipio/pegarCoberturaPercentualPorEstado/2023/${estado}`, {
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
        default: return 'Estado desconhecido';
    }
}


async function onStateClick(uf) {
    const estado = await getEstadoNome(uf)

    let populacoes = await pegarAumentoPopulacional(estado)
    let antenas = await pegarAntenas(estado)
    let operadora = await pegarOperadora(estado)

    alterarDados(estado, antenas, operadora, populacoes)
}

async function pegarAumentoPopulacional(estado) {
    return fetch(`/projecao/pegarAumentoPopulacionalPercentual/${estado}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            
            return [res.anos, res.crescimentosPopulacionais]
            // {"anos": res.anos, "populacoes": res.crescimentosPopulacionais}
        })
        .catch(error => {
            console.log(`#ERRO ao buscar aumento populacional: ${error}`);
            return null;
        });
}

async function pegarAntenas(estado) {
    return fetch(`/estacoesSMP/pegarAntenasPorEstado/${estado}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            return res.qtdAntenasPorEstado;
        })
        .catch(error => {
            console.log(`#ERRO ao buscar antenas: ${error}`);
            return null;
        });
}

async function pegarOperadora(estado) {
    return fetch(`/estacoesSMP/pegarMaiorOperadoraPorEstado/${estado}`, {
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

function alterarDados(estado, antenas, operadora, dadosPopulacoes) {
    let antenasTexto = antenas == null ? 'Dados de antenas inválidos' : `Existem ${antenas} antenas no estado`;
    let operadoraTexto = operadora == null ? 'Dados de operadora inválidos' : `Operadora com maior presença: ${operadora}`;

    let populacaoTexto = "";
    if (dadosPopulacoes == null) {
        populacaoTexto = 'Dados de população inválidos'
    } else {
        for (let i = 0; i < dadosPopulacoes[0].length; i++) {
            populacaoTexto += `Porcentagem de aumento populacional para ${dadosPopulacoes[0][i]}: ${dadosPopulacoes[1][i]}%\n`
        }
    }

    document.getElementById('antenas-estado').innerHTML = antenasTexto;
    document.getElementById('operadora-estado').innerHTML = operadoraTexto;
    document.getElementById('populacao-estado').innerHTML = populacaoTexto;
    document.getElementById('titulo-estado').innerHTML = "Estado: " + estado;
}