var database = require("../database/config")

function pegarUltimas(quantidade, fkCnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarUltimas(): ", quantidade, fkCnpj)
    var instrucaoSql = `
        SELECT texto, dataCriacao FROM notificacao 
        WHERE !paraEmpresa AND fkCnpj = '${fkCnpj}'
        ORDER BY dataCriacao DESC LIMIT ${quantidade};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pegarUltimas
};