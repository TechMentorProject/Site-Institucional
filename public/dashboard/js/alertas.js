// validar()
pegarNotificacoes()

async function pegarDados() {
    return fetch(`/notificacao//pegarUltimas/${sessionStorage.CNPJ}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            return [res.textos, res.datas]
        })
        .catch(error => {
            console.log(`#ERRO ao buscar cobertura: ${error}`);
            return null;
        });
}

async function pegarNotificacoes(textos, datas) {
    document.getElementsByClassName('container-alerta').innerHTML = ''
    alterarDados(await pegarDados(textos))
}

function alterarDados(textos) {
    for (let i = 0; i < textos.length; i++) {
        document.getElementsByClassName('container-alerta').innerHTML += `
            <div class="box-alerta">
                <div class="icon-alerta"></div>
                    <div class="box-mensagem">
                        <div class="container-mensagem">
                        <p>${textos[i]}</p>
                        </div>
                    <div class="azul"></div>
                </div>
            </div>`
    }
}