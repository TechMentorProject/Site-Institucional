const e = require("express");
var censoIBGEModel = require("../models/censoIBGEModel");

function pegarDensidadePorCidade(req, res) {
    var cidade = req.params.cidade;
    var estado = req.params.estado;

    if (cidade == undefined) {
        res.status(400).send("Seu cidade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else {
        censoIBGEModel.pegarDensidadePorCidade(cidade, estado)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    res.status(200).json({
                        densidadeDemografica: resultado[0].densidadeDemografica
                    });
                }
            ).catch((e) => {
                console.log(e)
            }
            );
    }
}

module.exports = {
    pegarDensidadePorCidade
}