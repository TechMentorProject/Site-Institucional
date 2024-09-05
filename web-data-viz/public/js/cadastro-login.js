var msgErro = document.getElementById("msgError");
var divErro = document.getElementById("divError");

function exibirMsg() {
    divErro.style.display = "flex";
    setTimeout(function () {
        divErro.style.display = "none";
    }, 1500);
}

function cadastrar() {
    var nomeVar = document.getElementById("input_usuario").value;
    var emailVar = document.getElementById("input_email").value;
    var tokenVar = document.getElementById("input_token").value;
    var senhaVar = document.getElementById("input_senha").value;
    var cnpjVar = document.getElementById("input_cnpj").value;
    var confirmacaoSenhaVar = document.getElementById(
        "input_confirmaSenha"
    ).value;

    if (
        nomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        tokenVar == "" ||
        cnpjVar == "" ||
        confirmacaoSenhaVar == ""
    ) {
        exibirMsg();
        mensagem = "Preencha todos os campos!";
        msgErro.innerHTML = mensagem;
        return false;
    } else if (emailVar.indexOf("@") == -1) {
        exibirMsg();
        mensagem = "E-mail inválido!";
        msgErro.innerHTML = mensagem;
        return false;
    } else if (emailVar.indexOf(".") == -1) {
        exibirMsg();
        mensagem = "E-mail inválido!";
        msgErro.innerHTML = mensagem;
        return false;
    } else if (senhaVar.length < 7) {
        exibirMsg();
        mensagem = "Senha inválida!";
        divErro.innerHTML = mensagem;
        return false;
    } else if (confirmacaoSenhaVar != senhaVar) {
        exibirMsg();
        mensagem = "Confirmação inválida!";
        divErro.innerHTML = mensagem;
        return false;
    } else if (cnpjVar.length < 14) {
        exibirMsg();
        mensagem = "CNPJ inválido!";
        divErro.innerHTML = mensagem;
    } else {
        exibirMsg();
        mensagem = "Cadastro concluído";
        divErro.innerHTML = mensagem;
    }
}

function entrar() {
    var nomeVar = document.getElementById("usuarioLog").value;
    var senhaVar = document.getElementById("senhaLog").value;

    if (nomeVar == "" || senhaVar == "") {
        exibirMsg();
        mensagem = "Preencha todos os campos!";
        msgErro.innerHTML = mensagem;
        return false;
    } else {
        exibirMsg();
        mensagem = "Login concluído com sucesso!";
        msgErro.innerHTML = mensagem;
    }
}