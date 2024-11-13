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
        SELECT nomeCidade, fkEstado, ROUND(AVG(areaCobertaPercent), 4) AS areaCoberta FROM municipio 
            JOIN cidade ON cidade.nomeCidade = municipio.fkCidade
            GROUP BY cidade.nomeCidade
            ORDER BY areaCoberta ASC 
            LIMIT 20;    
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarMenoresCoberturasPorEstado(estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarMenoresCoberturasPorEstado(): ", estado)
    var instrucaoSql = `
        SELECT nomeCidade, fkEstado, ROUND(AVG(areaCobertaPercent), 4) AS areaCoberta FROM municipio 
            JOIN cidade ON cidade.nomeCidade = municipio.fkCidade
            WHERE fkEstado = '${estado}'
            GROUP BY cidade.nomeCidade
            ORDER BY areaCoberta ASC 
            LIMIT 20;    
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarMenoresCoberturasPorTecnologia(tecnologia) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarMenoresCoberturasPorTecnologia(): ", tecnologia)
    var instrucaoSql = `
        SELECT nomeCidade, fkEstado, ROUND(AVG(areaCobertaPercent), 4) AS areaCoberta FROM municipio 
            JOIN cidade ON cidade.nomeCidade = municipio.fkCidade
            WHERE tecnologia LIKE '%${tecnologia}%'
            GROUP BY cidade.nomeCidade
            ORDER BY areaCoberta ASC 
            LIMIT 20;    
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarMenoresCoberturasPorEstadoETecnologia(estado, tecnologia) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarMenoresCoberturasPorEstadoETecnologia(): ", estado, tecnologia)
    var instrucaoSql = `
        SELECT nomeCidade, fkEstado, ROUND(AVG(areaCobertaPercent), 4) AS areaCoberta FROM municipio 
            JOIN cidade ON cidade.nomeCidade = municipio.fkCidade
            WHERE fkEstado = '${estado}' AND tecnologia LIKE '%${tecnologia}%'
            GROUP BY cidade.nomeCidade
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