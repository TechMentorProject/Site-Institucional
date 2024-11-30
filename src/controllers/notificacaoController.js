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
        }
        );
    }
}


module.exports = {
    pegarUltimas
}