var database = require("../database/config")

function pegarAumentoPopulacionalPercentual(ano, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarAumentoPopulacionalPercentual(): ", ano, estado)
    var instrucaoSql = `
        SELECT ( (proj.projecao - atual.populacaoEstado) / atual.populacaoEstado * 100 ) AS aumentoPercentual
            FROM 
            (SELECT SUM(densidadeDemografica * area) AS populacaoEstado 
                FROM censoIBGE 
                WHERE cidade LIKE '%${estado}%') AS atual,
            (SELECT projecao 
                FROM projecaoPopulacional 
                WHERE estado LIKE '%${estado}%' AND ano = ${ano}) AS proj;`;  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pegarAumentoPopulacionalPercentual
};