carregarFuncionarios()
let usuarioExcluir;
let emailAntigo;

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
            `<tr class="user-item">
                <td id="nome-usuario" class="user-info">${nomes[i]}</td>
                <td id="cargo-usuario" class="user-info">${cargos[i]}</td>
                <td class="user-info">
                <div class="container-edit">
                <div onclick="editarUsuario('${nomes[i]}', '${cargos[i]}', '${emails[i]}')" class="edit-button"></div>
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
        .then(async res => {
            popUpOk('remocao');
            await delay(1000);
            document.getElementById('modal-container').style.display = 'none'
            criarNotificaoEmpresa(`O funcionário ${document.getElementById('nome-adicionar').value} com o CPF ${document.getElementById('cpf-adicionar').value} foi removido com sucesso!`, sessionStorage.CNPJ)
            window.location.reload();
            return
        })
        .catch(error => {
            console.log(`#ERRO ao remover funcionário: ${error}`);
            document.getElementById('modal-container').style.display = 'none'
            return null;
        });
}

function editarUsuario(nome, cargo, email) {
    emailAntigo = email
    document.getElementById('edit-modal-container').style.display = 'flex'
    document.getElementById('user-name').value = nome
    document.getElementById('user-email').value = email
    exibirCargos('user-role')
}

function fechar() {
    document.getElementById('edit-modal-container').style.display = 'none'
    document.getElementById('user-modal-container').style.display = 'none'
    document.getElementById('modal-container').style.display = 'none'
    window.location.reload();
}

async function atualizarUsuario() {
    return fetch(`/usuarios/atualizarUsuario`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: await document.getElementById('user-name').value,
            email: await document.getElementById('user-email').value,
            fkNomeCargo: await document.getElementById('user-role').value,
            emailAntigo: emailAntigo
        })
    })
        .then(resposta => resposta.json())
        .then(async res => {
            popUpOk('atualizacao');
            await delay(1000);
            console.log(res)
            criarNotificaoEmpresa(`O funcionário ${document.getElementById('nome-adicionar').value} com o CPF ${document.getElementById('cpf-adicionar').value} foi atualizado com sucesso!`, sessionStorage.CNPJ)
            window.location.reload()
            return
        })
        .catch(error => {
            console.log(`#ERRO ao atualizar funcionário: ${error}`);
            window.location.reload()
            return null;
        });
}

async function exibirCargos(rota) {
    let cargos = await buscarCargos()
    for (var i = 0; i < cargos.length; i++) {
        document.getElementById(rota).innerHTML += `
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

    if (!validarCpf()) {
        return;
    }

    if (!validarSenha()) {
        return;
    }

    if (!validarEmail()) {
        return;
    }

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
        .then(async res => {
            popUpOk('cadastro')
            await delay(1000);
            console.log(res)
            criarNotificaoEmpresa(`O funcionário ${document.getElementById('nome-adicionar').value} com o CPF ${document.getElementById('cpf-adicionar').value} foi criado com sucesso!`, sessionStorage.CNPJ)
            fechar()
            return;
        })
        .catch(error => {
            console.log(`#ERRO ao cadastrar funcionário: ${error}`);
            fechar()
            return;
        });
}

function validarSenha() {
    const senha = document.getElementById('senha-adicionar').value;

    if (senha.length < 8) {
        popUpNotOk('senha');
        return false;
    }

    return true;
}

function validarCpf() {
    let cpf = document.getElementById('cpf-adicionar').value;

    if (cpf.length !== 14) {
        popUpNotOk('cpf');
        return false;
    }

    console.log(cpf)
    return true;
}

function validarEmail() {
    let email = document.getElementById('email-adicionar').value;

    if (email.indexOf("@") == -1) {
        popUpNotOk('email');
        return false;
    }

    console.log(email)
    return true;
}

function mascaraCpf(input) {

    let cpf = input.value.replace(/\D/g, "");

    if (cpf.length <= 3) {
        input.value = cpf;
    } else if (cpf.length <= 6) {
        input.value = cpf.replace(/(\d{3})(\d{1,})/, "$1.$2");
    } else if (cpf.length <= 9) {
        input.value = cpf.replace(/(\d{3})(\d{3})(\d{1,})/, "$1.$2.$3");
    } else {
        input.value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,})/, "$1.$2.$3-$4");
    }
}

function popUpOk(tipo) {
    let mensagem = ''

    if (tipo == 'cadastro') {
        mensagem = 'Cadastro realizado com Sucesso!'

    } else if (tipo == 'remocao') {
        mensagem = 'Usuário removido!'

    } else if (tipo == 'atualizacao') {
        mensagem = 'Usuário atualizado!'

    }


    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        didOpen: (toast) => {
            toast.style.marginTop = "50.5px";
        }
    });
    Toast.fire({
        iconColor: "#43BAFF",
        icon: "success",
        title: mensagem
    });
}

function popUpNotOk(tipo) {
    if (tipo == 'senha') {
        mensagem = 'A senha deve ter pelo menos 8 caracteres.'

    } else if (tipo == 'cpf') {
        mensagem = `CPF inválido.
        Deve conter 14 dígitos.`

    } else if (tipo == 'email') {
        mensagem = `E-mail inválido.
        Deve conter @`
    }

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        didOpen: (toast) => {
            toast.style.marginTop = "50.5px";
        }
    });
    Toast.fire({
        icon: "error",
        title: mensagem
    });
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}