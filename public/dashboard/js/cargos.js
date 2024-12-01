// validar()
exibirCargos()

function editarCargo(cargo, acesso) {
    document.getElementById('edit-modal-container').style.display = 'flex'
    
    // document.getElementById('user-name').placeholder = nome
    // document.getElementById('user-email').placeholder = acesso
}

async function atualizarCargo() {
    // Murilo TODO: atualizar cargo
    // return fetch(`/usuarios/pegarCargosPorEmpresa/${sessionStorage.CNPJ}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //     }
    // })
    //     .then(resposta => resposta.json())
    //     .then(res => {
    //         console.log(res)
    //         return [res.cargos, res.acessos]
    //     })
    //     .catch(error => {
    //         console.log(`#ERRO ao buscar cargos: ${error}`);
    //         return null;
    //     });
}

async function exibirCargos() {
    let dados = await buscarCargos()
    let cargos = dados[0]
    let acessos = dados[1]
    let estadosAcesso = []

    for (var i = 0; i < cargos.length; i++) {
        estadosAcesso.push([])
        if (acessos[i].includes('SP')) estadosAcesso[i].push('SP');
        if (acessos[i].includes('MS')) estadosAcesso[i].push('MS');
        if (acessos[i].includes('MG')) estadosAcesso[i].push('MG');
        if (acessos[i].includes('RJ')) estadosAcesso[i].push('RJ');
        if (acessos[i].includes('ES')) estadosAcesso[i].push('ES');
        if (acessos[i].includes('RS')) estadosAcesso[i].push('RS');
        if (acessos[i].includes('PR')) estadosAcesso[i].push('PR');
        if (acessos[i].includes('CLARO')) estadosAcesso[i].push('Claro');
        if (acessos[i].includes('OI')) estadosAcesso[i].push('Oi');
        if (acessos[i].includes('TIM')) estadosAcesso[i].push('Tim');
        if (acessos[i].includes('VIVO')) estadosAcesso[i].push('Vivo');

        document.getElementById('cargos').innerHTML = `
        <div class="cargo">
        <div class="ponto"></div>
        <div class="texto">
            <h3>${cargos[i]}</h3>
            <h4>Permissões: ${estadosAcesso}</h4>
        </div>
        <div class="edicao-exclusao">
            <div onclick="editarCargo('${cargos[i]}', '${acessos[i]}')" class="edit-button"></div>
            <div class="remove-button"></div>
        </div>
        </div>`;
    }
}

async function buscarCargos() {
    return fetch(`/usuarios/pegarCargosPorEmpresa/${sessionStorage.CNPJ}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            return [res.cargos, res.acessos]
        })
        .catch(error => {
            console.log(`#ERRO ao buscar cargos: ${error}`);
            return null;
        });
}

async function editarCa(cargo, acesso) {
    return fetch(`/usuarios/atualizarCargo/${sessionStorage.CNPJ}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeCargo: cargo,
            novoNomeCargo: document.getElementById('user-email').value,
            acessos: document.getElementById('user-role').value,
            cnpj: sessionStorage.CNPJ
        })
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            return [res.cargos, res.acessos]
        })
        .catch(error => {
            console.log(`#ERRO ao buscar cargos: ${error}`);
            return null;
        });
}