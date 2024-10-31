var database = require("../database/config")

function pegarQtdAntenasPorEstado(uf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarQtdAntenasPorEstado(): ", uf)
    var instrucaoSql = `
        SELECT COUNT(idEstacoesSMP) AS 'qtdAntenasPorEstado' FROM estacoesSMP WHERE cidade LIKE '%${uf}%';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pegarQtdAntenasPorEstado
};