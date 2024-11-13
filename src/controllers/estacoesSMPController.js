const e = require("express");
var estacoesSMPModel = require("../models/estacoesSMPModel");

function pegarQtdAntenasPorEstado(req, res) {
    var estado = req.params.estado;

    if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else {
        estacoesSMPModel.pegarQtdAntenasPorEstado(estado)
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
    var estado = req.params.estado;

    if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else {
        estacoesSMPModel.pegarMaiorOperadoraPorEstado(estado)
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

function pegarDensidadePorCidade(req, res) {
    var cidade = req.params.cidade;
    var estado = req.params.estado;

    if (cidade == undefined) {
        res.status(400).send("Seu cidade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else {
        estacoesSMPModel.pegarDensidadePorCidade(cidade, estado)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    if (resultado.length == 0) {
                        res.status(500).send("Nesta cidade não tem dados de densidade")
                    }
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

function pegarDomiciliosCobertosPorCidade(req, res) {
    var cidade = req.params.cidade;
    var estado = req.params.estado;

    if (cidade == undefined) {
        res.status(400).send("Seu cidade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else {
        estacoesSMPModel.pegarDomiciliosCobertosPorCidade(cidade, estado)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    res.status(200).json({
                        domiciliosCobertos: resultado[0].domiciliosCobertos
                    });
                }
            ).catch((e) => {
                console.log(e)
            }
            );
    }
}

function pegarPopulacaoPorCidade(req, res) {
    var cidade = req.params.cidade;
    var estado = req.params.estado;

    if (cidade == undefined) {
        res.status(400).send("Seu cidade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else {
        estacoesSMPModel.pegarPopulacaoPorCidade(cidade, estado)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    res.status(200).json({
                        populacao: resultado[0].populacao
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
    pegarMaiorOperadoraPorEstado,
    pegarDensidadePorCidade,
    pegarDomiciliosCobertosPorCidade,
    pegarPopulacaoPorCidade
}