function mostrarFotoPerfil() {
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
            console.log(resposta)
            if (resposta.status == 200) {
                console.log("DADOS COLETADOS!")
                resposta.json().then((res) => {
                    container.innerHTML = `<div>
                        <h1>${sessionStorage.EMAIL_USUARIO}</h1>
                        <img style="width: 300px; height: auto;"  src='./../assets/users/${res.imagemPerfil}'>
                    </div>`
                })
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function alterarFotoPerfil() {
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