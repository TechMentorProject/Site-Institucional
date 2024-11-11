const e = require("express");
var estacoesSMPModel = require("../models/estacoesSMPModel");

function pegarQtdAntenasPorEstado(req, res) {
    var uf = req.params.uf;

    if (uf == undefined) {
        res.status(400).send("Seu UF está undefined!");
    } else {
        estacoesSMPModel.pegarQtdAntenasPorEstado(uf)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    res.status(200).json({
                        qtdAntenasPorEstado: resultado[0].qtdAntenasPorEstado
                    });
                }
            ).catch((e) => {
                console.log(e)
            }
            );
    }
}

function pegarMaiorOperadoraPorEstado(req, res) {
    var uf = req.params.uf;

    if (uf == undefined) {
        res.status(400).send("Seu UF está undefined!");
    } else {
        estacoesSMPModel.pegarMaiorOperadoraPorEstado(uf)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    res.status(200).json({
                        operadora: resultado[0].operadora
                    });
                }
            ).catch((e) => {
                console.log(e)
            }
            );
    }
}

module.exports = {
    pegarQtdAntenasPorEstado,
    pegarMaiorOperadoraPorEstado
}