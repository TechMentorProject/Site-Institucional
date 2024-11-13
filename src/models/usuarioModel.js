var database = require("../database/config")

function autenticarUsuario(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticarUsuario(): ", email, senha)
    var instrucaoSql = `
        SELECT nomeUsuario, email, cpf, senha, imagemPerfil, fkNomeCargo, fkCnpj FROM usuario WHERE email = '${email}' AND senha = '${senha}';
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






function cadastrarUsuario(nome, email, cpf, senha, imagemPerfil, fkNomeCargo, fkCnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarUsuario():", nome, email, cpf, senha, imagemPerfil, fkNomeCargo, fkCnpj);

    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, email, cpf, senha, imagemPerfil, fkNomeCargo, fkCnpj) VALUES ('${nome}', '${email}', '${cpf}', '${senha}', '${imagemPerfil}', '${fkNomeCargo}', '${fkCnpj}');
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







function atualizarUsuario(nome, email, cpf, senha, fkNomeCargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarUsuario():", nome, email, senha, fkNomeCargo, cpf);

    var instrucaoSql = `
        UPDATE usuario SET nomeUsuario = '${nome}', email = '${email}',
            senha = '${senha}', fkNomeCargo = '${fkNomeCargo}'
            WHERE cpf = '${cpf}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarEmpresa(nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarEmpresa():", nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha);

    var instrucaoSql = `
        UPDATE empresa SET nomeEmpresa = '${nomeEmpresa}', nomeResponsavel = '${nomeResponsavel}',
            senha = '${senha}', emailResponsavel = '${emailResponsavel}'
            WHERE cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}







function removerUsuario(cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removerUsuario():", cpf);

    var instrucaoSql = `
        DELETE FROM usuario WHERE cpf = '${cpf}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inativarEmpresa(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function inativarEmpresa():", cnpj);

    var instrucaoSql = `
        DELETE FROM usuario WHERE fkCnpj = '${cnpj}';
        DELETE FROM empresa WHERE cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}







function salvarFoto(imagem, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function salvarFoto():", imagem, idUsuario);

    var instrucaoSql = `
        UPDATE usuario SET imagemPerfil = '${imagem}' WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticarUsuario,
    autenticarEmpresa,
    cadastrarUsuario,
    cadastrarEmpresa,
    atualizarUsuario,
    atualizarEmpresa,
    removerUsuario,
    inativarEmpresa,
    salvarFoto
};