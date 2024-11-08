const e = require("express");
var municipioModel = require("../models/municipioModel");

function pegarCoberturaPercentualPorEstado(req, res) {
    var ano = req.params.ano;
    var uf = req.params.uf;

    if (ano == undefined) {
        res.status(400).send("Seu ano está undefined!");
    } else if (uf == undefined) {
        res.status(400).send("Seu uf está undefined!");
    } else {
        municipioModel.pegarCoberturaPercentualPorEstado(ano, uf)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    res.status(200).json({
                        cobertura: resultado[0].cobertura
                    });
                }
            ).catch((e) => {
                console.log(e)
            }
            );
    }
}

function pegarAreaCoberturaPorCidade(req, res) {
    var cidade = req.params.cidade;

    if (cidade == undefined) {
        res.status(400).send("Seu cidade está undefined!");
    } else {
        municipioModel.pegarCoberturaPercentualPorEstado(cidade)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    res.status(200).json({
                        cobertura: resultado[0].areaCobertaPercent
                    });
                }
            ).catch((e) => {
                console.log(e)
            }
            );
    }
}

module.exports = {
    pegarCoberturaPercentualPorEstado,
    pegarAreaCoberturaPorCidade
}