// validar()
carregarHome()

// Conteúdo para o painel "func"
// function createFuncContent() {
//     return `
//         <div class="mensagens">
//             <h2>Últimas mensagens</h2>
//             <div class="msg">
//                 <img src="./assets/sino.png">
//                 <div class="texto">
//                     <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus doloremque non
//                         repudiandae molestias neque! Odit ea sapiente sunt iure, perferendis nihil magni
//                         nesciunt repudiandae quisquam fuga! Voluptate nihil explicabo omnis!
//                     </p>
//                 </div>
//             </div>
//             <div class="msg">
//                 <img src="./assets/sino.png">
//                 <div class="texto">
//                     <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus doloremque non
//                         repudiandae molestias neque! Odit ea sapiente sunt iure, perferendis nihil magni
//                         nesciunt repudiandae quisquam fuga! Voluptate nihil explicabo omnis!
//                     </p>
//                 </div>
//             </div>
//             <div class="msg">
//                 <img src="./assets/sino.png">
//                 <div class="texto">
//                     <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus doloremque non
//                         repudiandae molestias neque! Odit ea sapiente sunt iure, perferendis nihil magni
//                         nesciunt repudiandae quisquam fuga! Voluptate nihil explicabo omnis!
//                     </p>
//                 </div>
//             </div>
//         </div>
//         <div class="permissoes">
//             <h2>Permissões</h2>
//             <div class="lista">
//                 <li class="desativado">Permissão 1</li>
//                 <li>Permissão 1</li>
//                 <li>Permissão 1</li>
//                 <li>Permissão 1</li>
//                 <li>Permissão 1</li>
//                 <li>Permissão 1</li>
//             </div>
//         </div>
//     `;
// }

// // Conteúdo para o painel "empresa"
function createEmpresaContent() {
    return `
        <div class="box">
            <div class="conteudo1">
                <h2>Gerenciamento de Acessos</h2>
                <div class="dashboard">
                    <p>Acessos do Funcionário nos Últimos <select id="">
                    <option value="">7</option>
                    <option value="">15</option>
                    <option value="">30</option>
                    </select> Dias</p>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
            <div class="conteudo2">
                <h2>Perfis</h2>
                <div class="perfis">
                    <div class="perfil">
                        <div class="img-perfil"></div>
                        <span>Funcionario1</span>
                    </div>
                    <div class="perfil">
                        <div class="img-perfil"></div>
                        <span>Funcionario</span>
                    </div>
                    <div class="perfil">
                        <div class="img-perfil"></div>
                        <span>Funcionario3</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function carregarHome() {
    if (sessionStorage.EMPRESA == 'true') {
        carregarHomeEmpresa()
        pegarDadosEmp()
    } else {
        carregarHomeFuncionario()
        pegarDadosFunc()
    }
}

async function pegarCargo() {
    return fetch(`/usuarios/pegarCargo`, {
        method: "GET",
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

















function carregarHomeEmpresa() {
    carregarGraficoFuncionarios()
    pegarPermissoes()
}



function carregarGraficoFuncionarios(type) {
    const painel = document.querySelector('.painel');

    if (!painel) {
        console.error('Elemento com classe "painel" não encontrado.');
        return;
    }

    if (type === 'func') {
        painel.className = 'painel func';
        painel.innerHTML = createFuncContent();
    } else if (type === 'empresa') {
        painel.className = 'painel empresa';
        painel.innerHTML = createEmpresaContent();

        // Após atualizar o conteúdo, recrie o gráfico
        const ctx = document.getElementById('myChart');
        if (ctx) {
            const myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Comparecido', 'Não compareceu'],
                    datasets: [{
                        data: [12, 19],
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
                    maintainAspectRatio: false,
                }
            });
        } else {
            console.error('Canvas para o gráfico não encontrado.');
        }
    } else {
        console.error('Tipo de painel inválido.');
    }
}



function carregar() {
    document.querySelector('.painel').innerHTML = `
            <div class="box">
                <div class="conteudo1">
                    <h2>Gerenciamento de Acessos</h2>
                    <div class="dashboard">
                        <p>Acessos do Funcionário nos Últimos <select id="diasAcessos">
                        <option value="">7</option>
                        <option value="">15</option>
                        <option value="">30</option>
                        </select> Dias</p>
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
                <div class="conteudo2">
                    <h2>Perfis</h2>
                    <div class="perfis">
                        <div class="perfil">
                            <div class="img-perfil"></div>
                            <span>Funcionario1</span>
                        </div>
                        <div class="perfil">
                            <div class="img-perfil"></div>
                            <span>Funcionario</span>
                        </div>
                        <div class="perfil">
                            <div class="img-perfil"></div>
                            <span>Funcionario3</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
}



































function carregarDadosFunc() {
    carregarImagemPerfil(document.getElementById('perfil'))
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

function pegarDadosEmp() {
    document.getElementById('dado1').innerHTML = sessionStorage.NOME_EMPRESA || 'Empresa inválida'
    document.getElementById('dado2').innerHTML = sessionStorage.NOME_USUARIO || 'Nome inválido'
    document.getElementById('dado3').innerHTML = 'Dono'
    document.getElementById('email').innerHTML = sessionStorage.EMAIL_USUARIO || 'Email inválido'
    document.getElementById('dado4').innerHTML = sessionStorage.CNPJ || 'CNPJ inválido'
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
    
    if (acessos.includes(SP)) estadosAcesso += 'SP';
        else estadosSemAcesso += 'SP'
    if (acessos.includes(MS)) estadosAcesso += 'MS';
        else estadosSemAcesso += 'MS'
    if (acessos.includes(MG)) estadosAcesso += 'MG';
        else estadosSemAcesso += 'MG'
    if (acessos.includes(RJ)) estadosAcesso += 'RJ';
        else estadosSemAcesso += 'RJ'
    if (acessos.includes(ES)) estadosAcesso += 'ES';
        else estadosSemAcesso += 'ES'
    if (acessos.includes(RS)) estadosAcesso += 'RS';
        else estadosSemAcesso += 'RS'
    if (acessos.includes(PR)) estadosAcesso += 'PR';
        else estadosSemAcesso += 'PR'

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