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
        SELECT nomeEmpresa, nomeResponsavel, fkCnpj, emailResponsavel, senha, fkNomeCargo FROM empresa WHERE emailResponsavel = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarCargo(nomeCargo, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarCargo(): ", nomeCargo, cnpj)
    var instrucaoSql = `
        SELECT nomeCargo, acessos, fkCnpj, nomeEmpresa FROM cargo 
        JOIN empresa ON cargo.fkCnpj = empresa.cnpj 
        WHERE nomeCargo = '${nomeCargo}' AND empresa.cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarFuncionariosPorEmpresa(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarCargoPorFuncionario(): ", email, senha)
    var instrucaoSql = `
        SELECT nomeUsuario, email, cpf, senha, imagemPerfil, fkNomeCargo, fkCnpj FROM usuario JOIN cargo 
            ON usuario.fkNomeCargo = cargo.nomeCargo AND usuario.fkCnpj = cargo.fkCnpj 
            WHERE fkCnpj = '${cnpj}';
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

function cadastrarCargo(nomeCargo, acessos, fkCnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarCargo():", nomeCargo, acessos, fkCnpj);

    var instrucaoSql = `
        INSERT INTO cargo (nomeCargo, acessos, fkCnpj) VALUES ('${nomeCargo}', '${acessos}', '${fkCnpj}');
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

function atualizarSenhaEmpresa(senhaNova, cnpj, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarSenhaEmpresa():", cnpj, senha);

    var instrucaoSql = `
        UPDATE empresa SET senha = '${senhaNova}'
            WHERE cnpj = '${cnpj}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarCargo(nomeCargo, novoNomeCargo, acessos, fkCnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarCargo():", nomeCargo, novoNomeCargo, acessos, fkCnpj);

    var instrucaoSql = `
        UPDATE cargo SET acessos = '${acessos}', nomeCargo = '${novoNomeCargo}'
            WHERE nomeCargo = '${nomeCargo}' AND fkCnpj = '${fkCnpj}';
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
        DELETE FROM cargo WHERE fkCnpj = '${cnpj}';
        DELETE FROM usuario WHERE fkCnpj = '${cnpj}';
        DELETE FROM empresa WHERE cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function removerImagemEmpresa(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removerImagemEmpresa():", cnpj);

    var instrucaoSql = `
        UPDATE empresa SET imagemPerfil = null WHERE cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function removerCargo(nomeCargo, fkCnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removerCargo():", nomeCargo, fkCnpj);

    var instrucaoSql = `
        DELETE FROM cargo WHERE fkCnpj = '${fkCnpj}' AND nomeCargo = '${nomeCargo}';
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
    pegarCargo,
    pegarFuncionariosPorEmpresa,

    cadastrarUsuario,
    cadastrarEmpresa,
    cadastrarCargo,

    atualizarUsuario,
    atualizarEmpresa,
    atualizarSenhaEmpresa,
    atualizarCargo,

    removerUsuario,
    inativarEmpresa,
    removerCargo,

    salvarFoto
};