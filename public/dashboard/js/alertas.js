validar()
pegarNotificacoes()

async function pegarDados() {
    if (sessionStorage.EMPRESA == 'false') {
        return fetch(`/notificacao/pegarUltimasFuncionario/${sessionStorage.CNPJ}`, {
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
    } else {
        return fetch(`/notificacao/pegarUltimas/${sessionStorage.CNPJ}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(resposta => resposta.json())
            .then(res => {
                console.log(res)
                return [res.textos, res.datas, res.paraEmpresas]
            })
            .catch(error => {
                console.log(`#ERRO ao buscar cobertura: ${error}`);
                return null;
            });
    }
}

async function pegarNotificacoes() {
    document.getElementById('container-alerta').innerHTML = ''
    if (sessionStorage.EMPRESA == 'false') {
        document.getElementsByClassName('container-alerta').innerHTML = ''
        alterarDadosFunc(await pegarDados())
    } else {
        document.getElementsByClassName('container-alerta').innerHTML = ''
        alterarDadosEmp(await pegarDados())
    }
}

function alterarDadosEmp(dados) {
    let textos = dados[0]
    let datas = dados[1]
    let paraEmpresas = dados[2]

    for (let i = 0; i < textos.length; i++) {
        if (paraEmpresas[i] == '0' || paraEmpresas[i] == 0) {
            document.getElementById('container-alerta').innerHTML += `
            <div class="box-alerta">
                <div class="icon-alerta"></div>
                    <div class="box-mensagem">
                        <div class="container-mensagem">
                        <p>${datas[i]} - ${textos[i]}</p>
                        </div>
                    <div class="azul"></div>
                </div>
            </div>`
        } else {
            document.getElementById('container-alerta').innerHTML += `
                <div class="box-alerta">
                    <div class="icon-alerta"></div>
                        <div class="box-mensagem">
                        <div class="container-mensagem">
                        <p>${datas[i]} - ${textos[i]}</p>
                        </div>
                    <div class="claro"></div>
                </div>
            </div>`
        }
    }
}

function alterarDadosFunc(dados) {
    let textos = dados[0]
    let datas = dados[1]

    for (let i = 0; i < textos.length; i++) {
        document.getElementById('container-alerta').innerHTML += `
            <div class="box-alerta">
                <div class="icon-alerta"></div>
                    <div class="box-mensagem">
                        <div class="container-mensagem">
                        <p>${datas[i]} - ${textos[i]}</p>
                        </div>
                    <div class="azul"></div>
                </div>
            </div>`
    }
}