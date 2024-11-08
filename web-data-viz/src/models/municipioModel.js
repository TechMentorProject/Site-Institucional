var database = require("../database/config")

function pegarCoberturaPercentualPorEstado(ano, uf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarCoberturaPercentualPorEstado(): ", ano, uf)
    var instrucaoSql = `
        SELECT AVG(areaCobertaPercent) AS 'cobertura' FROM municipio
	        WHERE ano = '${ano}' AND cidade LIKE '%${uf}%';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarAreaCoberturaPorCidade(cidade) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarAreaCoberturaPorCidade(): ", cidade)
    var instrucaoSql = `
        SELECT areaCobertaPercent FROM municipio WHERE operadora = 'Todas' AND cidade LIKE '%${cidade}%'
	        ORDER BY areaCobertaPercent DESC LIMIT 1;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pegarCoberturaPercentualPorEstado,
    pegarAreaCoberturaPorCidade
};