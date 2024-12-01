function validar() {
    if (sessionStorage.EMAIL_USUARIO == null) {
        window.location = "./../index.html"
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

function carregarImagemPerfil() {
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
                    return imagemPerfil || 'padraoUsuario.png';
                })
            } else {
                return 'padraoUsuario.png';
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            return 'padraoUsuario.png';
        });

}

function criarNotificaoEmpresa(texto, dataCriacao, cnpj) {
    fetch("/usuarios/adicionarParaEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            texto: texto,
            dataCriacao: dataCriacao,
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