let tecnologiaEscolhida = 'NA'
let estadoEscolhido = 'NA'
pegarDadosTabela()

function filtrarPorEstado(estado) {
    estadoEscolhido = estado
    pegarDadosTabela()
}

function filtrarPorTecnologia(tecnologia) {
    tecnologiaEscolhida = tecnologia
    pegarDadosTabela()
}

async function pegarDadosTabela() {
    let dados = await buscarDadosTabela(estadoEscolhido, tecnologiaEscolhida)
    let cidades = dados[0]
    let estados = dados[1]
    let coberturas = dados[2]
    let operadoras = dados[3]
    let tecnologias = dados[4]

    carregarTabela(cidades, estados, coberturas, operadoras, tecnologias)
}

async function buscarDadosTabela(estado, tecnologia) {
    return fetch(`/municipio/pegarMenoresCoberturas/${estado}/${tecnologia}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            return [res.cidades, res.estados, res.coberturas, res.operadoras, res.tecnologias]
        })
        .catch(error => {
            console.log(`#ERRO ao buscar cobertura: ${error}`);
            return null;
        });
}

async function carregarTabela(cidades, estados, coberturas, operadoras, tecnologias) {
    for (let i = 0; i < cidades.length; i++) {
        document.getElementById('posicao' + (i + 1)).innerHTML = (i+1) + "°";
        document.getElementById('estado' + (i + 1)).innerHTML = estados[i];
        document.getElementById('cidade' + (i + 1)).innerHTML = cidades[i];
        document.getElementById('cobertura' + (i + 1)).innerHTML = coberturas[i] + "%";
        document.getElementById('operadora' + (i + 1)).innerHTML = operadoras[i];
        document.getElementById('tecnologia' + (i + 1)).innerHTML = tecnologias[i];
    }
}





async function getUfEstado(estado) {
    switch (estado) {
        case 'Espírito Santo': return 'ES';
        case 'Minas Gerais': return 'MG';
        case 'Rio de Janeiro': return 'RJ';
        case 'São Paulo': return 'SP';
        case 'Paraná': return 'PR';
        case 'Santa Catarina': return 'SC';
        case 'Rio Grande do Sul': return 'RS';
        default: return 'Estado desconhecido';
    }
}

async function pegarDadosCards(linha, i) {
    let cidade = linha.querySelector('#cidade'+i).innerText
    let estado = linha.querySelector('#estado'+i).innerText
    let uf = await getUfEstado(estado)

    let populacao = await pegarPopulacao(cidade, estado)
    let domicilios = await pegarDomicilios(cidade, estado)
    let densidade = await pegarDensidade(cidade, estado)

    alterarDados(cidade, uf, populacao, domicilios, densidade)
}

async function pegarPopulacao(cidade, estado) {
    return fetch(`/estacoesSMP/pegarPopulacaoPorCidade/${cidade}/${estado}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => res.populacao)
        .catch(error => {
            console.log(`#ERRO ao buscar densidade: ${error}`);
            return null;
        });
}

async function pegarDomicilios(cidade, estado) {
    return fetch(`/estacoesSMP/pegarDomiciliosCobertosPorCidade/${cidade}/${estado}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => res.domiciliosCobertos)
        .catch(error => {
            console.log(`#ERRO ao buscar densidade: ${error}`);
            return null;
        });
}

async function pegarDensidade(cidade, estado) {
    return fetch(`/estacoesSMP/pegarDensidadePorCidade/${cidade}/${estado}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => res.densidadeDemografica)
        .catch(error => {
            console.log(`#ERRO ao buscar densidade: ${error}`);
            return null;
        });
}


function alterarDados(cidade, uf, populacao, domicilios, densidade) {
    let populacaoTexto = populacao == null ? 'Dados de população inválidos' : `População estimada da cidade: ${Number(populacao).toFixed(0)} pessoas`;
    let domiciliosTexto = domicilios == null ? 'Dados de domicílios cobertos inválidos' : `Domicílios cobertos: ${Number(domicilios).toFixed(2)}%`;
    let densidadeTexto = densidade == null ? 'Dados de densidade demográfica inválidos' : `Densidade demográfica: ${Number(densidade).toFixed(2)} habitantes/quilometro²`;

    document.getElementById('populacao-cidade').innerHTML = populacaoTexto;
    document.getElementById('domicilios-cidade').innerHTML = domiciliosTexto;
    document.getElementById('densidade-cidade').innerHTML = densidadeTexto;
    document.getElementById('titulo-cidade').innerHTML = `Cidade: ${cidade} - ${uf}`;
}