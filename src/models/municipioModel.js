var database = require("../database/config")

function pegarCoberturaPercentualPorEstado(ano, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarCoberturaPercentualPorEstado(): ", ano, estado)
    var instrucaoSql = `
        SELECT AVG(areaCobertaPercent) AS cobertura FROM municipio
            JOIN cidade ON cidade.nomeCidade = municipio.fkCidade
            WHERE ano = '${ano}' AND cidade.fkEstado = '${estado}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}





function pegarMenoresCoberturas() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarMenoresCoberturas(): ")
    var instrucaoSql = `
        SELECT nomeCidade, fkEstado, ROUND(areaCobertaPercent, 4) AS areaCoberta, operadora, tecnologia  FROM municipio 
            JOIN cidade ON cidade.nomeCidade = municipio.fkCidade
            WHERE operadora = 'Todas' AND tecnologia = '2G, 3G, 4G, 5G'
            ORDER BY areaCoberta ASC 
            LIMIT 20;      
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarMenoresCoberturasPorEstado(estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarMenoresCoberturasPorEstado(): ", estado)
    var instrucaoSql = `
        SELECT nomeCidade, fkEstado, ROUND(areaCobertaPercent, 4) AS areaCoberta, operadora, tecnologia  FROM municipio 
            JOIN cidade ON cidade.nomeCidade = municipio.fkCidade
            WHERE operadora = 'Todas' AND tecnologia = '2G, 3G, 4G, 5G' AND fkEstado = '${estado}'
            ORDER BY areaCoberta ASC 
            LIMIT 20;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarMenoresCoberturasPorTecnologia(tecnologia) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarMenoresCoberturasPorTecnologia(): ", tecnologia)
    var instrucaoSql = `
        SELECT nomeCidade, fkEstado, ROUND(areaCobertaPercent, 4) AS areaCoberta, operadora, tecnologia  FROM municipio 
            JOIN cidade ON cidade.nomeCidade = municipio.fkCidade
            WHERE operadora = 'Todas' AND tecnologia LIKE '${tecnologia}'
            ORDER BY areaCoberta ASC 
            LIMIT 20;      
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarMenoresCoberturasPorEstadoETecnologia(estado, tecnologia) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarMenoresCoberturasPorEstadoETecnologia(): ", estado, tecnologia)
    var instrucaoSql = `
        SELECT nomeCidade, fkEstado, ROUND(areaCobertaPercent, 4) AS areaCoberta, operadora, tecnologia  FROM municipio 
            JOIN cidade ON cidade.nomeCidade = municipio.fkCidade
            WHERE operadora = 'Todas' AND tecnologia LIKE '${tecnologia}' AND fkEstado = '${estado}'
            ORDER BY areaCoberta ASC 
            LIMIT 20;   
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    pegarCoberturaPercentualPorEstado,
    pegarMenoresCoberturas,
    pegarMenoresCoberturasPorEstado,
    pegarMenoresCoberturasPorTecnologia,
    pegarMenoresCoberturasPorEstadoETecnologia
};