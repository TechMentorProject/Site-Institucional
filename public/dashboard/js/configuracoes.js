async function carregarDados() {
    if (sessionStorage.EMPRESA == "false") {
        // Modo Funcionário
        document.getElementById('nome_func').value = sessionStorage.NOME_USUARIO || '';
        document.getElementById('email_func').value = sessionStorage.EMAIL_USUARIO || '';
        document.getElementById('imagem-perfil').style.backgroundImage = `url("../assets/users/${await carregarImagemPerfil(false)}")`;
    } else {
        // Modo Empresa
        document.getElementById('nome_empresa').value = sessionStorage.NOME_EMPRESA || '';
        document.getElementById('nome_responsavel').value = sessionStorage.NOME_USUARIO || '';
        document.getElementById('email_responsavel').value = sessionStorage.EMAIL_USUARIO || '';
        document.getElementById('imagem-perfil').style.backgroundImage = `url("../assets/users/${await carregarImagemPerfil(true)}")`;
    }
    // Sempre carregar a imagem do perfil
}

carregarPagina();

function carregarPagina() {
    if (sessionStorage.EMPRESA === "false") {
        // Altera o layout para o modo Funcionário
        document.getElementById('usuario').innerHTML = `
            <div class="box-nome func">
                <span>Funcionário</span>
            </div>
        `;
        document.getElementById('perfil').innerHTML = `
            <div class="box-perfil">
                <span>Nome de Exibição</span>
                <input type="text" id="nome_func" placeholder="[Nome atual]">
            </div>
            <div class="box-perfil">
                <span>E-mail</span>
                <input type="text" id="email_func" placeholder="[E-mail atual]">
            </div>
        `;

        document.getElementById('button-delete').className = 'container-button-delete func';
    
    } else {
        
        document.getElementById('usuario').innerHTML = `
            <div class="box-nome">
                <span>Empresa</span>
            </div>
        `;

        document.getElementById('perfil').innerHTML = `
            <div class="box-perfil">
                <span>Nome da Empresa</span>
                <input type="text" id="nome_empresa">
            </div>
            <div class="box-perfil">
                <span>Nome do Responsável</span>
                <input type="text" id="nome_responsavel">
            </div>
            <div class="box-perfil">
                <span>E-mail da Empresa</span>
                <input type="text" id="email_responsavel">
            </div>
        `;

        document.getElementById('button-delete').className = 'container-button-delete';
    }

    carregarDados();
}


async function salvarAlteracoes() {
    if (sessionStorage.EMPRESA == 'true') {
        let nomeEmpresa = '';
        let nomeResp = '';
        let emailResp = '';
    
        let listaAlteracoes = []
        if (document.getElementById('nome_empresa').value != sessionStorage.NOME_EMPRESA) {
            nomeEmpresa = document.getElementById('nome_empresa').value;
            listaAlteracoes.push(nomeEmpresa)
        }
        if (document.getElementById('nome_responsavel').value != sessionStorage.NOME_USUARIO) {
            nomeResp = document.getElementById('nome_responsavel').value;
            listaAlteracoes.push(nomeResp)
        }
        if (document.getElementById('email_responsavel').value != sessionStorage.EMAIL_USUARIO) {
            emailResp = document.getElementById('email_responsavel').value;
            listaAlteracoes.push(emailResp)
        }

        console.log(nomeEmpresa)
        console.log(nomeResp)
        console.log(emailResp)
        console.log(listaAlteracoes)
    
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
                   alterarDadosEmp(nomeEmpresa, nomeResp, emailResp)
                }
            });
        }
    } else {
        let nomeFunc = '';
        let emailFunc = '';
    
        let listaAlteracoes = []
        if (document.getElementById('nome_func').value != sessionStorage.NOME_USUARIO) {
            listaAlteracoes += `${document.getElementById('nome_func').value},\n`
            nomeFunc = document.getElementById('nome_func').value;
        }
        if (document.getElementById('email_func').value != sessionStorage.EMAIL_USUARIO) {
            listaAlteracoes += `${document.getElementById('email_func').value}`
            emailFunc = document.getElementById('email_func').value;
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
                    alterarDadosFunc(nomeFunc, emailFunc)
                }
            });
        }
    }
}

async function alterarDadosEmp(nomeEmp, nomeResp, emailResp) {
    return fetch(`/usuarios/autenticarEmpresa`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: sessionStorage.EMAIL_USUARIO,
            senha: sessionStorage.SENHA_USUARIO
        })
    })
        .then(resposta => resposta.json())
        .then(res => {
            return fetch(`/usuarios/atualizarEmpresa`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nomeEmpresa: nomeEmp == '' ? res.nomeEmpresa : nomeEmp,
                    nomeResponsavel: nomeResp == '' ? res.nomeResponsavel : nomeResp,
                    cnpj: res.cnpj,
                    emailResponsavel: emailResp == '' ? res.emailResponsavel : emailResp,
                    senha: res.senha
                })
            })
                .then(resposta => resposta.json())
                .then(() => {
                    sessionStorage.NOME_EMPRESA = nomeEmp == '' ? res.nomeEmpresa : nomeEmp
                    sessionStorage.NOME_USUARIO = nomeResp == '' ? res.nomeResponsavel : nomeResp
                    sessionStorage.EMAIL_USUARIO = emailResp == '' ? res.emailResponsavel : emailResp
                    Swal.fire("Sucesso", "Dados alterados com sucesso!", "success");
                    window.location.reload()
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



async function alterarDadosFunc(nomeFunc, emailFunc) {
    return fetch(`/usuarios/autenticarUsuario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: sessionStorage.EMAIL_USUARIO,
            senha: sessionStorage.SENHA_USUARIO
        })
    })
        .then(resposta => resposta.json())
        .then(res => {
            return fetch(`/usuarios/atualizarUsuario`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nomeEmpresa: nomeFunc == '' ? res.nomeUsuario : nomeFunc,
                    fkNomeCargo: res.fkNomeCargo,
                    emailResponsavel: emailFunc == '' ? res.email : emailFunc,
                    emailAntigo: res.email
                })
            })
                .then(resposta => resposta.json())
                .then(() => {
                    sessionStorage.NOME_USUARIO = nomeFunc == '' ? res.nomeUsuario : nomeFunc
                    sessionStorage.EMAIL_USUARIO = emailFunc == '' ? res.email : emailFunc
                    Swal.fire("Sucesso", "Dados alterados com sucesso!", "success");
                    window.location.reload()
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
    let novaSenha = document.getElementById('senha_nova').value
    let dados = await validarSenha(tentativaSenha)

    if (!dados) {
        Swal.fire("Erro", "Senha anterior inválida", "error")
    } else {
        if (novaSenha == "") {
            Swal.fire("Senha deve ser prenchida")
        } else if (novaSenha.length < 7) {
            Swal.fire("Senha muito pequena")
        } else {
            alterarSenha(novaSenha, tentativaSenha)
        }
    }
}

async function validarSenha(tentativaSenha) {
    if (sessionStorage.EMPRESA == 'false') {
        return fetch(`/usuarios/autenticarUsuario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: sessionStorage.EMAIL_USUARIO,
                senha: tentativaSenha
            })
        })
            .then(resposta => resposta.json())
            .then(res => {
                return [res.cpf, res.senha];
            })
            .catch(error => {
                console.log(`#ERRO senha inválida: ${error}`);
                return false;
            });
    } else {
        return fetch(`/usuarios/autenticarEmpresa`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: sessionStorage.EMAIL_USUARIO,
                senha: tentativaSenha
            })
        })
            .then(resposta => resposta.json())
            .then(res => {
                return [res.cnpj, res.senha];
            })
            .catch(error => {
                console.log(`#ERRO senha inválida: ${error}`);
                return false;
            });
    }
}

async function alterarSenha(senhaNova, senhaAntiga) {
    if (sessionStorage.EMPRESA == 'false') {
        return fetch(`/usuarios/atualizarSenhaUsuario`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                senhaNova: senhaNova,
                cpf: sessionStorage.CPF,
                senhaAntiga: senhaAntiga
            })
        })
            .then((resposta) => {
                if (resposta.ok) {
                    sessionStorage.SENHA_USUARIO = senhaNova;
                    Swal.fire("Sucesso", "Senha alterada com sucesso!", "success");
                    return
                } else {
                    Swal.fire("Erro", "Não foi possível alterar a senha", "error");
                    return
                }
            })
            .catch((error) => {
                console.error(`#ERRO ao atualizar senha: ${error}`);
                Swal.fire("Erro", "Erro ao atualizar", "error");
                return null;
            });
    }
    return fetch(`/usuarios/atualizarSenhaEmpresa`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            senhaNova: senhaNova,
            cnpj: sessionStorage.CNPJ,
            senhaAntiga: senhaAntiga
        })
    })
        .then((resposta) => {
            if (resposta.ok) {
                sessionStorage.SENHA_USUARIO = senhaNova;
                Swal.fire("Sucesso", "Senha alterada com sucesso!", "success");
                return
            } else {
                Swal.fire("Erro", "Não foi possível alterar a senha", "error");
                return
            }
        })
        .catch((error) => {
            console.error(`#ERRO ao atualizar senha: ${error}`);
            Swal.fire("Erro", "Erro ao atualizar", "error");
            return null;
        });
}


function abrirImagem() {
    document.getElementById('upload-image').click()
}

function editarImagem() {
    var fotoInput = document.getElementById('upload-image')
    var file = fotoInput.files[0];
    var formData = new FormData();
    formData.append('foto', file);

    if (sessionStorage.EMPRESA == 'false') {
        fetch(`/usuarios/alterarFotoUsuario/${sessionStorage.CPF}`, {
            method: "POST",
            body: formData
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
                window.location.reload()
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                window.location.reload()
                return;
            });
    } else {
        fetch(`/usuarios/alterarFotoEmpresa/${sessionStorage.CNPJ}`, {
            method: "POST",
            body: formData
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
                window.location.reload()
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                window.location.reload()
                return;
            });
    }
}



function excluirImagem() {
    if (sessionStorage.EMPRESA == 'false') {
        fetch(`/usuarios/removerImagemUsuario`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cnpj: sessionStorage.CNPJ_EMPRESA
            }),
        })
            .then(function (resposta) {
                window.location.reload()
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                window.location.reload()
                return;
            });
    } else {
        fetch(`/usuarios/removerImagemEmpresa`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cnpj: sessionStorage.CNPJ
            }),
        })
            .then(function (resposta) {
                window.location.reload()
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                window.location.reload()
                return;
            });
    }
}