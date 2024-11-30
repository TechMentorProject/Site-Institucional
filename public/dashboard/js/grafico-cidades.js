//validar()
pegarDadosTabela()

async function pegarDadosTabela() {
    let estado = document.getElementById('filtro-est').value
    let operadora = document.getElementById('filtro-ope').value
    let tecnologia = document.getElementById('filtro-tec').value

    let dados = await buscarDadosTabela(estado, operadora, tecnologia)
    let cidades = dados[0]
    let estados = dados[1]
    let coberturas = dados[2]
    let operadoras = dados[3]
    let tecnologias = dados[4]

    carregarTabela(cidades, estados, coberturas, operadoras, tecnologias)
}

async function buscarDadosTabela(estado, operadora, tecnologia) {
    return fetch(`/municipio/pegarMenoresCoberturas/${estado}/${tecnologia}/${operadora}`, {
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
    for (let i = 1; i <= 20; i++) {
        if (i <= cidades.length) {
            console.log(i)
            document.getElementById('posicao' + (i)).innerHTML = (i) + "°";
            document.getElementById('estado' + (i)).innerHTML = estados[i-1];
            document.getElementById('cidade' + (i)).innerHTML = cidades[i-1];
            document.getElementById('cobertura' + (i)).innerHTML = coberturas[i-1] + "%";
            document.getElementById('operadora' + (i)).innerHTML = operadoras[i-1];
            document.getElementById('tecnologia' + (i)).innerHTML = tecnologias[i-1];
        } else {
            document.getElementById('posicao' + (i)).innerHTML = "-";
            document.getElementById('estado' + (i)).innerHTML = "-";
            document.getElementById('cidade' + (i)).innerHTML = "-";
            document.getElementById('cobertura' + (i)).innerHTML = "-";
            document.getElementById('operadora' + (i)).innerHTML = "-";
            document.getElementById('tecnologia' + (i)).innerHTML = "-";
        }
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