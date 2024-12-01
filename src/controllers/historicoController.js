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




function subtrairDias(dataInicial, dias, pattern = "yyyy-MM-dd") {
    const data = new Date(dataInicial);
    data.setDate(data.getDate() - dias);

    const formatarData = (data) => {
        const yyyy = data.getFullYear();
        const MM = String(data.getMonth() + 1).padStart(2, '0');
        const dd = String(data.getDate()).padStart(2, '0');
        
        return pattern
            .replace("yyyy", yyyy)
            .replace("MM", MM)
            .replace("dd", dd);
    };

    return formatarData(data);
}


function verificarAcessos(req, res) {
    console.log(req.params.dataAtual)
    var dataAtual = Date(req.params.dataAtual);
    var dataAcesso = subtrairDias(dataAtual, Number(req.params.dias))
    // var dataAcesso = Date(dataAtual.setDate(dataAtual.getDate() - Number(req.params.dias)));
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

function pegarFuncionariosSemAcesso(req, res) {
    console.log(req.params.dataAtual)
    var dataAtual = Date(req.params.dataAtual);
    var dataAcesso = subtrairDias(dataAtual, Number(req.params.dias))
    var cnpj = req.params.cnpj;
    let listaNomes = []

    if (dataAcesso == undefined) {
        res.status(400).send("Seu dataAtual está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else {
        historicoModel.pegarFuncionariosSemAcesso(cnpj, dataAcesso)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    for(var i = 0; i < resultado.length; i++) {
                        listaNomes.push(resultado[i])
                    }
                    res.status(200).json({
                        nomes: listaNomes
                    });
                }
            ).catch((e) => { console.log(e) });
    }
}

module.exports = {
    validarAcesso,
    verificarAcessos,
    pegarFuncionariosSemAcesso
}