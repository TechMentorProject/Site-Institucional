const e = require("express");
var municipioModel = require("../models/municipioModel");

function pegarCoberturaPercentualPorEstado(req, res) {
    var ano = req.params.ano;
    var estado = req.params.estado;

    if (ano == undefined) {
        res.status(400).send("Seu ano está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else {
        municipioModel.pegarCoberturaPercentualPorEstado(ano, estado)
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

function pegarMenoresCoberturas(req, res) {
    var estado = req.params.estado;
    var tecnologia = req.params.tecnologia;
    var operadora = req.params.operadora;
    var listaCidades = []
    var listaEstados = []
    var listaCoberturas = []
    var listaOperadoras = []
    var listaTecnologias = []

    if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if (tecnologia == undefined) {
        res.status(400).send("Seu tecnologia está undefined!");
    } else if (operadora == undefined) {
        res.status(400).send("Seu operadora está undefined!");
    } else {

        municipioModel.pegarMenoresCoberturas(operadora, tecnologia, estado).then(
            (resultado) => {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);
                for (var i = 0; i < resultado.length; i++) {
                    listaCidades.push(resultado[i].nomeCidade)
                    listaEstados.push(resultado[i].fkEstado)
                    listaCoberturas.push(resultado[i].areaCoberta)
                    listaOperadoras.push(resultado[i].operadora)
                    listaTecnologias.push(resultado[i].tecnologia)
                }
                res.status(200).json({
                    cidades: listaCidades,
                    estados: listaEstados,
                    coberturas: listaCoberturas,
                    operadoras: listaOperadoras,
                    tecnologias: listaTecnologias
                });
            }).catch((e) => { console.log(e) });
    }
}

module.exports = {
    pegarCoberturaPercentualPorEstado,
    pegarMenoresCoberturas
}