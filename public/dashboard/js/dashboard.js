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

function carregarImagemPerfil(elementoHtml) {
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
                    elementoHtml.innerHTML = `<img style="width: 100%; height: auto;"  src='./../assets/users/${res.imagemPerfil || 'padraoUsuario.png'}'>`
                })
            } else {
                elementoHtml.innerHTML = `<img style="width: 100%; height: auto;"  src='./../assets/users/padraoUsuario.png'>`
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            elementoHtml.innerHTML = `<img style="width: 100%; height: auto;"  src='./../assets/users/padraoUsuario.png'>`
        });

}