var database = require("../database/config")

function pegarCoberturaPercentualPorEstado(ano, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarCoberturaPercentualPorEstado(): ", ano, estado)
    var instrucaoSql = `
        SELECT AVG(areaCobertaPercentual) AS cobertura FROM baseMunicipio
            JOIN cidade ON cidade.nomeCidade = baseMunicipio.fkCidade
            WHERE ano = '${ano}' AND cidade.fkEstado = '${estado}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}





function pegarMenoresCoberturas(operadora, tecnologia, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarMenoresCoberturas(): ")
    var instrucaoSql = `
        SELECT nomeCidade, fkEstado, areaCobertaPercentual AS areaCoberta, operadora, tecnologia  FROM baseMunicipio 
            JOIN cidade ON cidade.nomeCidade = baseMunicipio.fkCidade
            WHERE operadora = '${operadora}' AND tecnologia = '${tecnologia}' AND fkEstado = '${estado}'
            ORDER BY areaCoberta ASC 
            LIMIT 20;      
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    pegarCoberturaPercentualPorEstado,
    pegarMenoresCoberturas
};