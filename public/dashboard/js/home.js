validar()
carregarHome()
let grafico;

async function carregarHome() {
    await pegarCargo()
    if (sessionStorage.EMPRESA == 'true') {
        carregarVisualEmpresa()
        carregarHomeEmpresa()
        pegarDadosEmp()
    } else {
        carregarVisualFuncionario()
        carregarHomeFuncionario()
        pegarDadosFunc()
    }
}

async function pegarCargo() {
    return fetch(`/usuarios/pegarCargo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeCargo: sessionStorage.NOME_CARGO,
            cnpj: sessionStorage.CNPJ
        })
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            sessionStorage.ACESSOS = res.acessos
            sessionStorage.NOME_EMPRESA = res.nomeEmpresa
            return
        })
        .catch(error => {
            console.log(`#ERRO ao buscar o cargo: ${error}`);
            return null;
        });
}











function carregarVisualEmpresa() {
    document.getElementById('painel-principal').className = "painel empresa"
    document.getElementById('painel-principal').innerHTML =`
        <div class="box">
            <div class="conteudo1">
                <h2>Gerenciamento de Acessos</h2>
                <div class="dashboard">
                    <p>Acessos do Funcionário nos Últimos <select onChange="carregarHomeEmpresa()" id="dias-grafico">
                    <option value="7">7</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    </select> Dias</p>
                    <div id="chartContainer" style="position: relative; min-width: 300px; min-height: 300px;">
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="conteudo2">
                <h2>Perfis</h2>
                <div id="perfis-funcionarios" class="perfis">
                    
                </div>
            </div>
        </div>
    `;
}

function carregarVisualFuncionario() {
    document.getElementById('painel-principal').className = "painel func"
    document.getElementById('painel-principal').innerHTML =`
    <h2 id="titulo-utlimas-mensagens" clas="titulo">Últimas mensagens</h2>
    <div class="mensagens">
        <div class="msg"></div>
        <div class="msg"></div>
    </div>
    <div class="permissoes">
        <h2>Permissões</h2>
        <div id="lista-permissoes" class="lista"></div>
    </div>`
}






async function carregarHomeEmpresa() {
    document.getElementById('perfil').style.backgroundImage = `url("../assets/users/${await carregarImagemPerfil(true)}")`;
    let dados = await pegarDadosFuncionarios(await document.getElementById('dias-grafico').value)
    carregarGraficoFuncionarios(dados)
    pegarFuncionarios(await document.getElementById('dias-grafico').value)
}

async function pegarFuncionarios(dias) {
    document.getElementById('perfis-funcionarios').innerHTML = ``
    let pessoas = await pegarDadosSemAcesso(dias)
    let nomes = pessoas[0]
    let cpfs = pessoas[1]
    for (var i = 0; i < nomes.length; i++) {
        document.getElementById('perfis-funcionarios').innerHTML += `
        <div class="perfil">
            <span>${cpfs} - ${nomes}</span>
        </div>`
    }
    // <div class="img-perfil"></div>
}

async function pegarDadosSemAcesso(dias) {
    let dataAtual = new Date()
    return fetch(`/historico/pegarFuncionariosSemAcesso/'${dataAtual}'/${dias}/${sessionStorage.CNPJ}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            return [res.nomes, res.cpfs]
        })
        .catch(error => {
            console.log(`#ERRO ao buscar cobertura: ${error}`);
            return null;
        });
}


async function pegarDadosFuncionarios(dias) {
    let dataAtual = new Date()
    return fetch(`/historico/verificarAcessos/'${dataAtual}'/${dias}/${sessionStorage.CNPJ}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            return [res.total, res.acessos, res.semAcessos]
        })
        .catch(error => {
            console.log(`#ERRO ao buscar cobertura: ${error}`);
            return null;
        });
}

function carregarGraficoFuncionarios(dados) {
    const ctxGrafico = document.getElementById('myChart');

    // Destrua o gráfico existente, se houver
    if (grafico) {
        grafico.destroy();
    }

    // Crie o novo gráfico e armazene na variável global
    grafico = new Chart(ctxGrafico, {
        type: 'pie',
        data: {
            labels: ['Comparecido', 'Não compareceu'],
            datasets: [{
                label: 'Últimas Notas: Gosto Pessoal',
                data: [dados[1], dados[2]],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}





































async function carregarDadosFunc() {
    document.getElementById('perfil').style.backgroundImage = `url("../assets/users/${await carregarImagemPerfil(false)}")`;
    pegarCargo()
    pegarDadosFunc()
}

async function pegarDadosFunc() {
    document.getElementById('dado1').innerHTML = sessionStorage.NOME_USUARIO || 'Nome inválido'
    document.getElementById('dado2').innerHTML = sessionStorage.NOME_EMPRESA || 'Empresa inválida'
    document.getElementById('dado3').innerHTML = sessionStorage.NOME_CARGO || 'Cargo inválido'
    document.getElementById('email').innerHTML = sessionStorage.EMAIL_USUARIO || 'Email inválido'
    document.getElementById('dado4').innerHTML = sessionStorage.CPF || 'CPF inválido'
}

function destransformarCnpj(cnpj) {
    let posicao = cnpj.length - 8;
    return cnpj.substring(0, posicao) + "/" + cnpj.substring(posicao + 1);
}

function pegarDadosEmp() {
    document.getElementById('dado1').innerHTML = sessionStorage.NOME_EMPRESA || 'Empresa inválida'
    document.getElementById('dado2').innerHTML = sessionStorage.NOME_USUARIO || 'Nome inválido'
    document.getElementById('dado3').innerHTML = 'Dono'
    document.getElementById('email').innerHTML = sessionStorage.EMAIL_USUARIO || 'Email inválido'
    document.getElementById('dado4').innerHTML = destransformarCnpj(sessionStorage.CNPJ) || 'CNPJ inválido'
}

function carregarHomeFuncionario() {
    pegarNotificacoesFunc()
    pegarPermissoes()
}

async function pegarNotificacoesFunc() {
    document.getElementsByClassName('mensagens').innerHTML = '<h2>Últimas mensagens</h2>'
    alterarMensagensFunc(await pegarUltimasMensagensFunc())
}

function pegarPermissoes() {
    let acessos = sessionStorage.ACESSOS
    let estadosAcesso = []
    let estadosSemAcesso = []

    document.getElementById('lista-permissoes').innerHTML = `
        <li>Alertas</li>
        <li class="desativado">Gerenciamento de funcionários e cargos</li>
        <li>Gráficos de estados e cidades</li>
        <li class="desativado">Gerenciamento de acessos</li>`;
    
    if (acessos.includes('SP')) estadosAcesso.push('SP');
        else estadosSemAcesso.push('SP')
    if (acessos.includes('MS')) estadosAcesso.push('MS');
        else estadosSemAcesso.push('MS')
    if (acessos.includes('MG')) estadosAcesso.push('MG');
        else estadosSemAcesso.push('MG')
    if (acessos.includes('RJ')) estadosAcesso.push('RJ');
        else estadosSemAcesso.push('RJ')
    if (acessos.includes('ES')) estadosAcesso.push('ES');
        else estadosSemAcesso.push('ES')
    if (acessos.includes('RS')) estadosAcesso.push('RS');
        else estadosSemAcesso.push('RS')
    if (acessos.includes('PR')) estadosAcesso.push('PR');
        else estadosSemAcesso.push('PR')

    if (estadosAcesso.length == 7) {
        document.getElementById('lista-permissoes').innerHTML += `
        <li>Estados: ${estadosAcesso}</li>`;
    } else if (estadosAcesso.length == 1) {
        document.getElementById('lista-permissoes').innerHTML += `
        <li>Estado: ${estadosAcesso}</li>
        <li class="desativado">Estados: ${estadosSemAcesso}</li>`;
    } else if (estadosAcesso.length == 6) {
        document.getElementById('lista-permissoes').innerHTML += `
        <li>Estados: ${estadosAcesso}</li>
        <li class="desativado">Estado: ${estadosSemAcesso}</li>`;
    } else {
        document.getElementById('lista-permissoes').innerHTML += `
        <li>Estado: ${estadosAcesso}</li>
        <li class="desativado">Estado: ${estadosSemAcesso}</li>`;
    }
}

async function pegarUltimasMensagensFunc() {
    return fetch(`/notificacao/pegarUltimas/${sessionStorage.CNPJ}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            return [res.textos, res.datas]
        })
        .catch(error => {
            console.log(`#ERRO ao buscar cobertura: ${error}`);
            return null;
        });
}

async function alterarMensagensFunc(dados) {
    let textos = dados[0]
    let datas = dados[1]

    let tamanho = 3
    if (textos.length == 0) {
        document.getElementById('titulo-utlimas-mensagens').innerHTML = 'Procura das últimas mensagens indisponível'
    } else if (textos.length < 3) {
        tamanho = textos.length
    }
    for (let i = 0; i < tamanho; i++) {
        document.getElementsByClassName('mensagens').innerHTML += `
            <div class="msg">
                <img src="./assets/sino.png">
                <div class="texto">
                    <p>${datas[i]} - ${textos[i]}</p>
                </div>
            </div>`
    }
}
