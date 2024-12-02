var notificacaoModel = require("../models/notificacaoModel");

function pegarUltimas(req, res) {
    var quantidade = 10;
    var fkCnpj = req.params.fkCnpj;
    let listaTextos = []
    let listaDatas = []

    if (fkCnpj == undefined) {
        res.status(400).send("Seu fkCnpj está undefined!");
    } else {
        notificacaoModel.pegarUltimas(quantidade, fkCnpj)
        .then(
            (resultado) => {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);
                for (var i = 0; i < resultado.length; i++) {
                    listaTextos.push(resultado[i].texto)
                    listaDatas.push(resultado[i].dataCriacao)
                }
                res.status(200).json({
                    textos: listaTextos,
                    datas: listaDatas
                });
            }
        ).catch((e) => {
            console.log(e)
            res.status(500)
        }
        );
    }
}






function adicionarParaEmpresa(req, res) {
    var texto = req.body.texto;
    var cnpj = req.body.fkCnpj;
    var paraEmpresa = 1;

    if (texto == undefined) {
        res.status(400).send("Seu texto está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else {
        notificacaoModel.adicionarParaEmpresa(texto, cnpj, paraEmpresa)
        .then(
            (resultado) => {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);
                res.status(200)
            }
        ).catch((e) => {
            console.log(e)
            res.status(500)
        }
        );
    }
}

module.exports = {
    pegarUltimas,
    adicionarParaEmpresa
}