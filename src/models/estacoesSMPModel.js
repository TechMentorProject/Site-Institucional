var database = require("../database/config")

function pegarQtdAntenasPorEstado(estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarQtdAntenasPorEstado(): ", estado)
    var instrucaoSql = `
        SELECT qtdAntenas AS qtdAntenasPorEstado FROM estado WHERE nomeEstado = '${estado}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarMaiorOperadoraPorEstado(estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarMaiorOperadoraPorEstado(): ", estado)
    var instrucaoSql = `
        SELECT maiorOperadora as operadora, qtdAntenas as aparicoes from estado where nomeEstado = '${estado}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarDensidadePorCidade(cidade, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarDensidadePorCidade(): ", cidade, estado)
    var instrucaoSql = `
        SELECT densidadeDemografica FROM baseCensoIBGE 
            JOIN cidade ON cidade.nomeCidade = baseCensoIBGE.fkCidade
            WHERE cidade.nomeCidade = '${cidade}' AND cidade.fkEstado = '${estado}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarDomiciliosCobertosPorCidade(cidade, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarDomiciliosCobertosPorCidade(): ", cidade, estado)
    var instrucaoSql = `
        SELECT AVG(domiciliosCobertosPercentual) AS domiciliosCobertos FROM baseMunicipio 
            JOIN cidade ON cidade.nomeCidade = baseMunicipio.fkCidade
            WHERE fkCidade = '${cidade}' AND fkEstado = '${estado}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarPopulacaoPorCidade(cidade, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarPopulacaoPorCidade(): ", cidade, estado)
    var instrucaoSql = `
        SELECT SUM(area * densidadeDemografica) AS populacao FROM baseCensoIBGE 
            JOIN cidade ON cidade.nomeCidade = baseCensoIBGE.fkCidade
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