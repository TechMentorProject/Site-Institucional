const e = require("express");
var populacaoModel = require("../models/populacaoModel");

function pegarAumentoPopulacionalPercentual(req, res) {
    var ano = req.params.ano;
    var estado = req.params.estado;

    if (ano == undefined) {
        res.status(400).send("Seu ano está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else {
        populacaoModel.pegarAumentoPopulacionalPercentual(ano, estado)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    res.status(200).json({
                        aumentoPercentual: resultado[0].aumentoPercentual
                    });
                }
            ).catch((e) => {
                console.log(e)
            }
            );
    }
}

module.exports = {
    pegarAumentoPopulacionalPercentual
}