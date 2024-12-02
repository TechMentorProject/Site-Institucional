function validar() {
    if (sessionStorage.EMAIL_USUARIO == null) {
        window.location = "./../index.html"
    }

    if (sessionStorage.EMPRESA === "false") {
        const dropdownPainel = document.getElementById('dropdown-painel');
        if (dropdownPainel) {
            dropdownPainel.style.display = 'none';
        }
    }
}

function deslogar() {
    sessionStorage.clear();
    window.location.href = './../index.html';
}

function validarCargo(pagina) {
    let cargo = sessionStorage.CARGO
    if (cargo.includes(pagina)) {
        window.location.href = './home.html'
    }
}

async function carregarImagemPerfil(empresa) {
    if (empresa) {
        return fetch("/usuarios/autenticarEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: sessionStorage.EMAIL_USUARIO,
                senha: sessionStorage.SENHA_USUARIO
            }),
        })
            .then(resposta => resposta.json())
            .then(res => {
                if (res.imagemPerfil != null && res.imagemPerfil != undefined) {
                    return res.imagemPerfil
                }
                return 'padraoUsuario.png';
            })
            .catch(e => {
                console.log(`#ERRO: ${e}`);
                return 'padraoUsuario.png';
            });
    } else {
        return fetch("/usuarios/autenticarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: sessionStorage.EMAIL_USUARIO,
                senha: sessionStorage.SENHA_USUARIO
            }),
        })
            .then(resposta => resposta.json())
            .then(res => {
                if (res.imagemPerfil != null && res.imagemPerfil != undefined) {
                    return res.imagemPerfil
                }
                return 'padraoUsuario.png';
            })
            .catch(e => {
                console.log(`#ERRO: ${e}`);
                return 'padraoUsuario.png';
            });
    }
}

function criarNotificaoEmpresa(texto, cnpj) {
    fetch("/notificacao/adicionarParaEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            texto: texto,
            fkCnpj: cnpj
        }),
    })
        .then(function (resposta) {
            if (resposta.status == 200) {
                return true
            } else {
                return false;
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO ao criar notificação: ${resposta}`);
            return false;
        });
}