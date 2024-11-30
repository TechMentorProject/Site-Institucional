var database = require("../database/config")

function pegarAumentoPopulacionalPercentual(anoInicial, anoFinal, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarAumentoPopulacionalPercentual(): ", anoInicial, anoFinal, estado)
    var instrucaoSql = `
        SELECT 
            p_future.fkEstado AS estado,
            p_future.ano AS ano,
            ROUND(((p_future.projecao - p_base.projecao) / p_base.projecao) * 100, 2) AS crescimentoPercentualAnual
        FROM baseProjecaoPopulacional p_base
        JOIN 
            baseProjecaoPopulacional p_future 
            ON p_base.fkEstado = p_future.fkEstado 
            AND p_base.ano = ${anoInicial}  -- Ano base para o cálculo
            AND p_future.ano BETWEEN ${Number(anoInicial) + 1} AND ${anoFinal}
        WHERE p_base.fkEstado = '${estado}'
        ORDER BY p_future.ano;`;  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pegarAumentoPopulacionalPercentual
};