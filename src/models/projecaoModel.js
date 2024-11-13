var database = require("../database/config")

function pegarAumentoPopulacionalPercentual(anoInicial, anoFinal, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarAumentoPopulacionalPercentual(): ", anoInicial, anoFinal, estado)
    var instrucaoSql = `
        SELECT p1.fkEstado AS estado, p1.ano AS ano,
            ROUND(((p1.projecao - p2.projecao) / p2.projecao) * 100, 2) AS crescimentoPercentualAnual
        FROM projecaoPopulacional p1
        JOIN projecaoPopulacional p2 
            ON p1.fkEstado = p2.fkEstado AND p1.ano = p2.ano + 1
        WHERE p1.ano BETWEEN ${anoInicial} AND ${anoFinal}
            AND p1.fkEstado = '${estado}'
        ORDER BY p1.ano`;  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pegarAumentoPopulacionalPercentual
};