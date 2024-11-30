carregarDados()

function carregarDados() {
    document.getElementById('nome_empresa').placeholder = sessionStorage.NOME_EMPRESA || '';
    document.getElementById('nome_responsavel').placeholder = sessionStorage.NOME_RESPONSAVEL || '';
    document.getElementById('email_responsavel').placeholder = sessionStorage.EMAIL_RESPONSAVEL || '';
    mostrarFotoPerfil()
}

function salvarAlteracoes() {
    let nomeEmpresa = false;
    let nomeResp = false;
    let emailResp = false;

    let listaAlteracoes = []
    if(document.getElementById('nome_empresa').value != '') {
        listaAlteracoes += `Nome da Empresa: ${document.getElementById('nome_empresa').value}`
        nomeEmpresa = true;
    }
    if(document.getElementById('nome_responsavel').value != '') {
        listaAlteracoes += `Nome do Responsável: ${document.getElementById('nome_responsavel').value}`
        nomeResp = true;
    }
    if(document.getElementById('email_responsavel').value != '') {
        listaAlteracoes += `Email do Responvável: ${document.getElementById('email_responsavel').value}`
        emailResp = true;
    }

    if (listaAlteracoes.length == 0) {
        alert("Escolha pelo menos um campo")
    } else {
        alert(`Realmente deseja alterar os campos ${listaAlteracoes}?\nSIM   NÃO`)
        if (false) {
            alterarDados(nomeEmpresa, nomeResp, emailResp)
        }
    }
}

async function alterarDados(nomeEmp, nomeResp, emailResp) {
    return fetch(`/usuarios/autenticarEmpresa`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            return fetch(`/usuarios/atualizarEmpresa/${cidade}/${estado}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nomeEmpresa: nomeEmp == false ? res.nomeEmpresa : nomeEmp,
                    nomeResponsavel: nomeResp == false ? res.nomeResponsavel : nomeResp,
                    cnpj: res.cnpj,
                    emailResponsavel: emailResp == false ? res.emailResponsavel : emailResp,
                    senha: res.senha
                })
            })
                .then(resposta => resposta.json())
                .then(window.location = './configuracoes.html')
                .catch(error => {
                    console.log(`#ERRO ao atualizar os dados: ${error}`);
                    return null;
                });
        })
        .catch(error => {
            console.log(`#ERRO ao buscar dados: ${error}`);
            return null;
        });
}

async function mudarSenha() {
    let tentativaSenha = document.getElementById('senha_antiga').value
    let dados = await validarSenha(tentativaSenha)

    if (dados == false) {
        alert("Senha anterior inválida")
    } else {
        if (tentativaSenha == "") {
            alert("Senha deve ser prenchida")
        } else if (tentativaSenha.length < 7) {
            alert("Senha muito pequena")
        } else {
            alterarSenha(novaSenha, )
        }
    }
}

async function validarSenha(tentativaSenha) {
    return fetch(`/usuarios/autenticarEmpresa`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            if(res.senha == tentativaSenha) { 
                return [res.cnpj, res.senha];
            } else { 
                return false;
            }
        })
        .catch(error => {
            console.log(`#ERRO ao buscar densidade: ${error}`);
            return null;
        });
}

async function alterarSenha(senhaNova, cnpj, senhaAntiga) {
    return fetch(`/usuarios/atualizarSenhaEmpresa`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            senhaNova: senhaNova,
            cnpj: cnpj,
            senhaAntiga: senhaAntiga,
        })
    })
        .then(resposta => resposta.json())
        .then(alert("Senha atualizada com sucesso!"))
        .catch(error => {
            console.log(`#ERRO ao atualizar senha: ${error}`);
            return null;
        });
}


function mostrarFotoPerfil() {
    let elementoImagem = document.getElementById('imagem-perfil')

    fetch("/usuarios/autenticarUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: sessionStorage.EMAIL_USUARIO,
            senha: sessionStorage.SENHA_USUARIO
        }),
    })
        .then(function (resposta) {
            if (resposta.status == 200) {
                resposta.json().then((res) => {
                    elementoImagem.innerHTML = `<img style="width: 100%; height: auto;"  src='./../assets/users/${res.imagemPerfil || 'padraoUsuario.png'}'>`
                })
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function editarImagem() {
    var fotoInput = document.getElementById('foto')
    var file = fotoInput.files[0];
    var formData = new FormData();
    formData.append('foto', file);

    fetch(`/usuarios/alterarFoto/${1}`, {
        method: "POST",
        body: formData
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            console.log("IMAGEM ALTERADA!")
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            return;
        });
}



function excluirImagem() {
    fetch(`/usuarios/removerImagemEmpresa/${1}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cnpj: sessionStorage.CNPJ_EMPRESA
        }),
    })
        .then(function (resposta) {
            alert('Imagem removida')
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            return;
        });
}