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
        SELECT nomeEmpresa, nomeResponsavel, emailResponsavel, senha, cnpj, imagemPerfil FROM empresa WHERE emailResponsavel = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarUsuarioPorEmail(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarUsuarioPorEmail(): ", email)

    var instrucaoSql = `
        SELECT cpf FROM usuario WHERE email = '${email}';
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

function pegarCargoFuncionario(cpf, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarCargoFuncionario(): ", cpf, cnpj)
    var instrucaoSql = `
        SELECT nomeCargo, acessos FROM cargo 
        JOIN usuario ON cargo.nomeCargo = usuario.fkNomeCargo 
        WHERE cpf = '${cpf}' AND cargo.fkCnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarFuncionariosPorEmpresa(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarFuncionariosPorEmpresa(): ", cnpj)
    var instrucaoSql = `
        SELECT nomeUsuario, email, fkNomeCargo 
        FROM usuario WHERE fkCnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarCargosPorEmpresa(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarCargosPorEmpresa(): ", cnpj)
    var instrucaoSql = `
        SELECT nomeCargo, acessos 
        FROM cargo WHERE fkCnpj = '${cnpj}';
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

function cadastrarEmpresa(nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha, imagemPerfil) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha, imagemPerfil);

    var instrucaoSql = `
        INSERT INTO empresa (nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha, imagemPerfil) VALUES ('${nomeEmpresa}', '${nomeResponsavel}', '${cnpj}', '${emailResponsavel}', '${senha}', '${imagemPerfil}');
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







function atualizarUsuario(nome, email, fkNomeCargo, emailAntigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarUsuario():", nome, email, fkNomeCargo, emailAntigo);

    var instrucaoSql = `
        UPDATE usuario SET nomeUsuario = '${nome}', email = '${email}', fkNomeCargo = '${fkNomeCargo}'
            WHERE email = '${emailAntigo}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarSenhaUsuario(senhaNova, cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarSenhaUsuario():", cpf, senha);

    var instrucaoSql = `
        UPDATE usuario SET senha = '${senhaNova}'
            WHERE cnpj = '${cnpj}' AND senha = '${senha}';
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





function pegarUsuariosComCargo(nomeCargo, fkCnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarUsuariosComCargo():", nomeCargo, fkCnpj);

    var instrucaoSql = `
        SELECT cpf, nomeUsuario FROM usuario 
        WHERE fkNomeCargo = '${nomeCargo}' AND fkCnpj = '${fkCnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarCargoParaNull(cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarCargoParaNull():", cpf);

    var instrucaoSql = `
        UPDATE usuario SET fkNomeCargo = null WHERE cpf = '${cpf}';
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

function atualizarCargoFuncionario(novoNomeCargo, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarCargoFuncionario():", novoNomeCargo, cpf);

    var instrucaoSql = `
        UPDATE usuario SET fkNomeCargo = '${novoNomeCargo}'
        WHERE cpf = '${cpf}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}






function removerCargoUsuario(cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removerCargoUsuario():", cpf);

    var instrucaoSql = `
        UPDATE usuario SET fkNomeCargo = null WHERE cpf = '${cpf}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function removerHistoricoUsuario(cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removerHistoricoUsuario():", cpf);

    var instrucaoSql = `
        DELETE FROM historico WHERE fkCpf = '${cpf}';
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

function removerImagemUsuario(cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removerImagemUsuario():", cpf);

    var instrucaoSql = `
        UPDATE usuario SET imagemPerfil = null WHERE cpf = '${cpf}';
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







function salvarFotoUsuario(imagem, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function salvarFotoUsuario():", imagem, cpf);

    var instrucaoSql = `
        UPDATE usuario SET imagemPerfil = '${imagem}' WHERE cpf = '${cpf}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarFotoEmpresa(imagem, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function salvarFotoEmpresa():", imagem, cnpj);

    var instrucaoSql = `
        UPDATE empresa SET imagemPerfil = '${imagem}' WHERE cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}













function pegarUsuariosRemEmp(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarUsuariosRemEmp():", cnpj);

    var instrucaoSql = `
        SELECT cpf FROM usuario WHERE fkCnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function removerUsuariosRemEmp(cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removerUsuariosRemEmp():", cpf);

    var instrucaoSql = `
        DELETE FROM usuario WHERE cpf = '${cpf}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




function pegarCargosRemEmp(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarCargosRemEmp():", cnpj);

    var instrucaoSql = `
        SELECT nomeCargo FROM cargo WHERE fkCnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function removerCargosRemEmp(nomeCargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removerCargosRemEmp():", nomeCargo);

    var instrucaoSql = `
        DELETE FROM cargo WHERE nomeCargo = '${nomeCargo}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




function removerHistoricosRemEmp(cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removerHistoricosRemEmp():", cpf);

    var instrucaoSql = `
        DELETE FROM historico WHERE fkCpf = '${cpf}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function removerEmpresaRemEmp(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removerEmpresaRemEmp():", cnpj);

    var instrucaoSql = `
        DELETE FROM empresa WHERE cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}












module.exports = {
    autenticarUsuario,
    pegarUsuarioPorEmail,
    autenticarEmpresa,
    pegarCargo,
    pegarCargoFuncionario,
    pegarFuncionariosPorEmpresa,
    pegarCargosPorEmpresa,

    cadastrarUsuario,
    cadastrarEmpresa,
    cadastrarCargo,

    atualizarUsuario,
    atualizarEmpresa,
    atualizarSenhaEmpresa,

    pegarUsuariosComCargo,
    atualizarCargoParaNull,
    atualizarCargo,
    atualizarCargoFuncionario,

    removerCargoUsuario,
    removerHistoricoUsuario,
    removerUsuario,

    removerImagemUsuario,
    removerImagemEmpresa,
    removerCargo,

    salvarFotoUsuario,
    salvarFotoEmpresa,

    pegarUsuariosRemEmp,
    removerUsuariosRemEmp,
    pegarCargosRemEmp,
    removerCargosRemEmp,
    removerHistoricosRemEmp,
    removerEmpresaRemEmp
};