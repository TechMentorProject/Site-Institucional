const e = require("express");
var projecaoModel = require("../models/projecaoModel");

function pegarAumentoPopulacionalPercentual(req, res) {
    var estado = req.params.estado;
    var anoInicial = "2024";
    var anoFinal = "2030";
    let listaCrescimentosPopulacionais = []
    let listaAnos = []

    if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else {
        projecaoModel.pegarAumentoPopulacionalPercentual(anoInicial, anoFinal, estado)
            .then(
                (resultado) => {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    for (var i = 0; i < resultado.length; i++) {
                        listaCrescimentosPopulacionais.push(resultado[i].crescimentoPercentualAnual)
                        listaAnos.push(resultado[i].ano)
                    }
                    res.status(200).json({
                        crescimentosPopulacionais: listaCrescimentosPopulacionais,
                        anos: listaAnos
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