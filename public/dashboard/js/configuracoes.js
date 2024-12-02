carregarDados()


function carregarDados() {
    document.getElementById('nome_empresa').value = sessionStorage.NOME_EMPRESA || '';
    document.getElementById('nome_responsavel').value = sessionStorage.NOME_USUARIO || '';
    document.getElementById('email_responsavel').value = sessionStorage.EMAIL_USUARIO || '';
    document.getElementById('imagem-perfil').style.backgroundImage = `url(../assets/${carregarImagemPerfil()})`;
}
carregarPagina();

function carregarPagina(){
    if (sessionStorage.EMPRESA === "false") {
        const isEmpresaFalse = sessionStorage.EMPRESA === "false"; // Converte em booleano
        if (isEmpresaFalse) {
            document.getElementById('usuario').innerHTML = `
            <div class="box-nome func">
                <span>Funcionário</span>
            </div>
            `;
    
            document.getElementById('perfil').innerHTML = `
            <div class="box-perfil">
                <span>Nome de Exibição</span>
                <input type="text" placeholder="[Nome atual]">
            </div>
            <div class="box-perfil">
                <span>E-mail</span>
                <input type="text" placeholder="[E-mail atual]">
            </div>`;
    
            document.getElementById('button-delete').className = 'container-button-delete func';
        }
    }
}

function salvarAlteracoes() {
    let nomeEmpresa = false;
    let nomeResp = false;
    let emailResp = false;

    let listaAlteracoes = []
    if(document.getElementById('nome_empresa').value != '') {
        listaAlteracoes += `${document.getElementById('nome_empresa').value},\n`
        nomeEmpresa = true;
    }
    if(document.getElementById('nome_responsavel').value != '') {
        listaAlteracoes += `${document.getElementById('nome_responsavel').value},\n`
        nomeResp = true;
    }
    if(document.getElementById('email_responsavel').value != '') {
        listaAlteracoes += `${document.getElementById('email_responsavel').value}`
        emailResp = true;
    }

    if (listaAlteracoes.length == 0) {
        Swal.fire("Escolha pelo menos um campo")
    } else {
        Swal.fire({
            title: "Confirmação",
            text: `Realmente deseja alterar para os dados: \n${listaAlteracoes}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não"
        }).then((result) => {
            if (result.isConfirmed) {
                alterarDados(nomeEmpresa, nomeResp, emailResp).then(() => {
                    Swal.fire("Sucesso", "Dados alterados com sucesso!", "success");
                });
            }
        });
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
                .then(() => {
                    sessionStorage.NOME_EMPRESA = nomeEmp == false ? res.nomeEmpresa : nomeEmp
                    sessionStorage.NOME_RESPONSAVEL = nomeResp == false ? res.nomeResponsavel : nomeResp
                    sessionStorage.EMAIL_RESPONSAVEL = emailResp == false ? res.emailResponsavel : emailResp
                    window.location = './configuracoes.html'   
                })
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
        Swal.fire("Senha anterior inválida")
    } else {
        if (tentativaSenha == "") {
            Swal.fire("Senha deve ser prenchida")
        } else if (tentativaSenha.length < 7) {
            Swal.fire("Senha muito pequena")
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
            senhaAntiga: senhaNova,
            cnpj: cnpj,
            senhaAntiga: senhaAntiga,
        })
    })
    .then((resposta) => {
        if (resposta.ok) {
            sessionStorage.SENHA_USUARIO = senhaNova;
            Swal.fire("Sucesso", "Senha alterada com sucesso!", "success");
        } else {
            throw new Error("Erro ao alterar senha.");
        }
    })
    .catch((error) => {
        console.error(`#ERRO ao atualizar senha: ${error}`);
        Swal.fire("Erro", "Não foi possível alterar a senha", "error");
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