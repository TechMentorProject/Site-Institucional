const e = require("express");
var historicoModel = require("../models/historicoModel");

function validarAcesso(req, res) {
    var dataAtual = res.params.dataAtual;
    var cpf = req.params.cpf;

    if (dataAtual == undefined) {
        res.status(400).send("Seu dataAtual está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else {
        historicoModel.validarAcesso(dataAtual, cpf)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);

                    if (resultado[0].resultado == 0) {

                        historicoModel.inserirHistorico(dataAtual, cpf)
                            .then(
                                (resultado) => {
                                    console.log(`\nResultados encontrados: ${resultado.length}`);
                                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                                    res.status(200);
                                }
                            ).catch((e) => { console.log(e) });

                    } else { res.status(200); }
                }
            ).catch((e) => { console.log(e) });
    }
}



function verificarAcessos(req, res) {
    var dataAtual = res.params.dataAtual;    
    var dataAcesso = dataAtual.setDate(dataAtual.getDate() - req.params.dias);
    var cnpj = req.params.cnpj;

    var qtdFuncionarios = 0;
    var qtdAcessos = 0;

    if (dataAcesso == undefined) {
        res.status(400).send("Seu dataAcesso está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else {
        historicoModel.pegarQuantidadeFuncionarios(cnpj)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    qtdFuncionarios = Number(resultado[0].qtdFuncionarios)

                    historicoModel.pegarFuncionariosAcesso(cnpj, dataAcesso)
                        .then(
                            (resultado) => {
                                console.log(`\nResultados encontrados: ${resultado.length}`);
                                console.log(`Resultados: ${JSON.stringify(resultado)}`);
                                qtdAcessos = Number(resultado[0].qtdAcessos)
                                res.status(200).json({
                                    total: qtdFuncionarios,
                                    acessos: qtdAcessos,
                                    semAcessos: (qtdFuncionarios - qtdAcessos)
                                });
                            }
                        ).catch((e) => { console.log(e) });

                }
            ).catch((e) => { console.log(e) });
    }
}

module.exports = {
    validarAcesso,
    verificarAcessos
}