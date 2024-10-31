var database = require("../database/config")

function autenticarUsuario(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticarUsuario(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, email, cpf, senha, idCargo, idEmpresa FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticarEmpresa(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticarEmpresa(): ", email, senha)
    var instrucaoSql = `
        SELECT idEmpresa, nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha FROM empresa WHERE emailResponsavel = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarUsuario(nome, email, cpf, senha, idCargo, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarUsuario():", nome, email, cpf, senha, idCargo, idEmpresa);

    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, email, cpf, senha, idCargo, idEmpresa) VALUES ('${nome}', '${email}', '${cpf}', '${senha}', '${idCargo}', '${idEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEmpresa(nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha);

    var instrucaoSql = `
        INSERT INTO empresa (nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha) VALUES ('${nomeEmpresa}', '${nomeResponsavel}', '${cnpj}', '${emailResponsavel}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticarUsuario,
    autenticarEmpresa,
    cadastrarUsuario,
    cadastrarEmpresa
};