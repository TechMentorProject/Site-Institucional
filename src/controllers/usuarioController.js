var usuarioModel = require("../models/usuarioModel");

function autenticarUsuario(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticarUsuario(email, senha)
            .then(
                (resultado) => {
                    if (resultado.length == 1) {
                        console.log(`\nResultados encontrados: ${resultado.length}`);
                        console.log(`Resultados: ${JSON.stringify(resultado)}`);
                        res.status(200).json({
                            nomeUsuario: resultado[0].nomeUsuario,
                            email: resultado[0].email,
                            cpf: resultado[0].cpf,
                            senha: resultado[0].senha,
                            imagemPerfil: resultado[0].imagemPerfil,
                            fkNomeCargo: resultado[0].fkNomeCargo,
                            fkCnpj: resultado[0].fkCnpj,
                        });
                    } else {
                        res.status(403).send("Email ou senha inválido!")
                    }
                }
            ).catch(
                console.log("Erro na busca de usuário")
            );
    }
}

function autenticarEmpresa(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticarEmpresa(email, senha)
            .then(
                (resultado) => {
                    if (resultado.length == 1) {
                        console.log(`\nResultados encontrados: ${resultado.length}`);
                        console.log(`Resultados: ${JSON.stringify(resultado)}`);                        
                        res.status(200).json({
                            nomeEmpresa: resultado[0].nomeEmpresa,
                            nomeResponsavel: resultado[0].nomeResponsavel,
                            cnpj: resultado[0].cnpj,
                            emailResponsavel: resultado[0].emailResponsavel,
                            senha: resultado[0].senha
                        });
                    } else {
                        res.status(403).send("Email ou senha inválido!")
                    }
                }
            ).catch(
                console.log("Erro na busca de empresa")
            );
    }
}







function cadastrarUsuario(req, res) {
    var imagemPerfil = "padraoUsuario.png";
    var nome = req.body.nome;
    var email = req.body.email;
    var cpf = req.body.cpf;
    var senha = req.body.senha;
    var fkNomeCargo = req.body.fkNomeCargo;
    var fkCnpj = req.body.fkCnpj;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Sua cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkNomeCargo == undefined) {
        res.status(400).send("Sua fkNomeCargo está undefined!");
    } else if (fkCnpj == undefined) {
        res.status(400).send("Sua fkCnpj está undefined!");
    } else {
        usuarioModel.cadastrarUsuario(nome, email, cpf, senha, imagemPerfil, fkNomeCargo, fkCnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarEmpresa(req, res) {
    var nomeEmpresa = req.body.nomeEmpresa;
    var nomeResponsavel = req.body.nomeResponsavel;
    var cnpj = req.body.cnpj;
    var emailResponsavel = req.body.emailResponsavel;
    var senha = req.body.senha;

    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nomeEmpresa está undefined!");
    } else if (nomeResponsavel == undefined) {
        res.status(400).send("Seu nomeResponsavel está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Sua cnpj está undefined!");
    } else if (emailResponsavel == undefined) {
        res.status(400).send("Sua emailResponsavel está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrarEmpresa(nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}







function atualizarUsuario(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var cpf = req.body.cpf;
    var senha = req.body.senha;
    var fkNomeCargo = req.body.fkNomeCargo;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Sua cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkNomeCargo == undefined) {
        res.status(400).send("Sua fkNomeCargo está undefined!");
    } else {
        usuarioModel.atualizarUsuario(nome, email, cpf, senha, fkNomeCargo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarEmpresa(req, res) {
    var nomeEmpresa = req.body.nomeEmpresa;
    var nomeResponsavel = req.body.nomeResponsavel;
    var cnpj = req.body.cnpj;
    var emailResponsavel = req.body.emailResponsavel;
    var senha = req.body.senha;

    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nomeEmpresa está undefined!");
    } else if (nomeResponsavel == undefined) {
        res.status(400).send("Seu nomeResponsavel está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Sua cnpj está undefined!");
    } else if (emailResponsavel == undefined) {
        res.status(400).send("Sua emailResponsavel está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.atualizarEmpresa(nomeEmpresa, nomeResponsavel, cnpj, emailResponsavel, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}







function removerUsuario(req, res) {
    var cpf = req.body.cpf;

    if (cpf == undefined) {
        res.status(400).send("Sua cpf está undefined!");
    } else {
        usuarioModel.removerUsuario(cpf)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a remoção! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function inativarEmpresa(req, res) {
    var cnpj = req.body.cnpj;
    
    if (cnpj == undefined) {
        res.status(400).send("Sua cnpj está undefined!");
    } else {
        usuarioModel.inativarEmpresa(cnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a remoção! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}








function salvarFoto(req, res) {
    var imagem = req.file.filename;
    var idUsuario = req.params.idUsuario;

    if (imagem == undefined) {
        res.status(400).send("Seu imagem está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {        
        usuarioModel.salvarFoto(imagem, idUsuario)
        .then(resultado => {
            res.status(201).send("Imagem alterada");
        }).catch(err => {
            res.status(500).send(err);
        });
    }
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
}