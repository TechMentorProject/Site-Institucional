// // validar()
carregarFuncionarios()
let usuarioExcluir;

function carregarTela() {
    if (sessionStorage.EMPRESA == 'true') {
        carregarFuncionarios()
    } else {
        window.location.href = './../home.html'
    }
}

async function carregarFuncionarios() {
    let dados = await pegarDadosUsuarios()
    exibirFuncionarios(dados[0], dados[1], dados[2])
}

async function pegarDadosUsuarios() {
    return fetch(`/usuarios/pegarFuncionariosPorEmpresa/${sessionStorage.CNPJ}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            return [res.nomes, res.emails, res.cargos]
        })
        .catch(error => {
            console.log(`#ERRO ao buscar funcionários: ${error}`);
            return null;
        });
}

function exibirFuncionarios(nomes, emails, cargos) {
    document.getElementById('tabela').innerHTML = ''
    for (var i = 0; i < nomes.length; i++) {
        document.getElementById('tabela').innerHTML +=
            `<tr id="${emails[i]}" class="user-item">
                <td id="nome-usuario" class="user-info">${nomes[i]}</td>
                <td id="cargo-usuario" class="user-info">${cargos[i]}</td>
                <td class="user-info">
                <div class="container-edit">
                <div onclick="editarUsuario(this)" class="edit-button"></div>
                <div onclick="abrirExcluir('${emails[i]}')"
                class="remove-button"
                role="button"
                aria-label="Excluir"
                ></div>
                </div>
                </td>
            </tr>`
    }
}

function abrirExcluir(email) {
    usuarioExcluir = email
    document.getElementById('modal-container').style.display = 'flex'
}

async function excluirUsuario() {
    return fetch(`/usuarios/removerUsuario`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: usuarioExcluir
        })
    })
        .then(resposta => resposta.json())
        .then(res => {
            document.getElementById('modal-container').style.display = 'none'
            window.location.href = ''
            return
        })
        .catch(error => {
            console.log(`#ERRO ao remover funcionário: ${error}`);
            document.getElementById('modal-container').style.display = 'none'
            window.location.href = ''
            return null;
        });
}

function editarUsuario(elemento) {
    let email = elemento.id;
    let nome = elemento.querySelector("#nome-usuario").textContent;
    let cargo = elemento.querySelector("#cargo-usuario").textContent;

    document.getElementById('edit-modal-container').style.display = 'flex'
    document.getElementById('user-name').placeholder = nome
    document.getElementById('user-email').placeholder = email
    exibirCargos('user-role')
}

function fechar() {
    document.getElementById('edit-modal-container').style.display = 'none'
    document.getElementById('user-modal-container').style.display = 'none'
    document.getElementById('modal-container').style.display = 'none'
    window.location.href = ''
}

async function atualizarUsuario() {
    return fetch(`/usuarios/atualizarUsuario`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: await document.getElementById('user-name').value,
            email: await document.getElementById('user-email').value,
            fkNomeCargo: await document.getElementById('user-role').value,
        })
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            return
        })
        .catch(error => {
            console.log(`#ERRO ao atualizar funcionário: ${error}`);
            return null;
        });
}

async function exibirCargos(rota) {
    let cargos = await buscarCargos()
    for (var i = 0; i < cargos.length; i++) {
        document.getElementById(rota).innerHTML = `
        <option value="${cargos[i]}">${cargos[i]}</option>`;
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
            return res.cargos
        })
        .catch(error => {
            console.log(`#ERRO ao buscar cargos: ${error}`);
            return null;
        });
}

async function adicionarUsuario() {
    document.getElementById('user-modal-container').style.display = 'flex'
    await exibirCargos('cargo-adicionar')
}

async function cadastrarUsuario() {

    return fetch(`/usuarios/cadastrarUsuario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: await document.getElementById('nome-adicionar').value,
            email: await document.getElementById('email-adicionar').value,
            cpf: await document.getElementById('cpf-adicionar').value,
            senha: await document.getElementById('senha-adicionar').value,
            fkNomeCargo: await document.getElementById('cargo-adicionar').value,
            fkCnpj: sessionStorage.CNPJ
        }),
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            fechar()
            return;
        })
        .catch(error => {
            console.log(`#ERRO ao cadastrar funcionário: ${error}`);
            fechar()
            return;
        });
}