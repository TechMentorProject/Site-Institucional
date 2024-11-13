var database = require("../database/config")

function pegarQtdAntenasPorEstado(estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarQtdAntenasPorEstado(): ", estado)
    var instrucaoSql = `
        SELECT COUNT(*) AS qtdAntenasPorEstado FROM estacoesSMP
            JOIN cidade ON cidade.nomeCidade = estacoesSMP.fkCidade
            WHERE cidade.fkEstado = '${estado}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarMaiorOperadoraPorEstado(estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarMaiorOperadoraPorEstado(): ", estado)
    var instrucaoSql = `
        SELECT operadora, COUNT(*) AS aparicoes FROM estacoesSMP
            JOIN cidade ON cidade.nomeCidade = estacoesSMP.fkCidade
            WHERE cidade.fkEstado = '${estado}'
            GROUP BY operadora ORDER BY aparicoes DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarDensidadePorCidade(cidade, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarDensidadePorCidade(): ", cidade, estado)
    var instrucaoSql = `
        SELECT densidadeDemografica FROM censoIBGE 
            JOIN cidade ON cidade.nomeCidade = censoIBGE.fkCidade
            WHERE cidade.nomeCidade = '${cidade}' AND cidade.fkEstado = '${estado}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarDomiciliosCobertosPorCidade(cidade, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarDomiciliosCobertosPorCidade(): ", cidade, estado)
    var instrucaoSql = `
        SELECT AVG(domiciliosCobertosPercent) AS domiciliosCobertos FROM municipio 
            JOIN cidade ON cidade.nomeCidade = municipio.fkCidade
            WHERE fkCidade = '${cidade}' AND fkEstado = '${estado}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarPopulacaoPorCidade(cidade, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarPopulacaoPorCidade(): ", cidade, estado)
    var instrucaoSql = `
        SELECT SUM(area * densidadeDemografica) AS populacao FROM censoIBGE 
            JOIN cidade ON cidade.nomeCidade = censoIBGE.fkCidade
            WHERE fkCidade = '${cidade}' AND fkEstado = '${estado}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pegarQtdAntenasPorEstado,
    pegarMaiorOperadoraPorEstado,
    pegarDensidadePorCidade,
    pegarDomiciliosCobertosPorCidade,
    pegarPopulacaoPorCidade
};