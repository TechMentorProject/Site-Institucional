var database = require("../database/config")

function validarAcesso(data, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function validarAcesso(): ", data, cpf)
    var instrucaoSql = `
        SELECT CASE 
        WHEN EXISTS (SELECT 1 FROM historico WHERE dataAcesso = '${data}' AND fkCpf = '${cpf}') 
        THEN TRUE 
        ELSE FALSE 
        END AS resultado;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirHistorico(data, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function inserirHistorico(): ", data, cpf)
    var instrucaoSql = `
        INSERT INTO historico (dataAcesso, fkCpf) VALUES ('${data}', '${cpf}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}





function pegarQuantidadeFuncionarios(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarQuantidadeFuncionarios(): ", cnpj)
    var instrucaoSql = `
        SELECT COUNT(*) AS qtdFuncionarios FROM empresa WHERE fkCnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarFuncionariosAcesso(cnpj, data) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarFuncionariosAcesso(): ", cnpj, data)
    var instrucaoSql = `
        SELECT COUNT(DISTINCT usuario.cpf) AS qtdAcessos FROM usuario
    JOIN historico ON usuario.cpf = historico.fkCpf
    WHERE usuario.fkCnpj = '${cnpj}' AND dataAcesso >= '${data}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    validarAcesso,
    inserirHistorico,

    pegarQuantidadeFuncionarios,
    pegarFuncionariosAcesso
};