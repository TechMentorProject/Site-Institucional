var msgErro = document.getElementById("msgError");
var divErro = document.getElementById("divError");

function cadastrar() {
    var empresaVar = document.getElementById("input_nomeEmpresa").value;
    var emailVar = document.getElementById("input_email").value;
    var nomeResponsavelVar = document.getElementById("input_nomeResponsavel").value;
    var senhaVar = document.getElementById("input_senha").value;
    var cnpjVar = document.getElementById("input_cnpj").value;
    var confirmacaoSenhaVar = document.getElementById("input_confirmaSenha").value;

    var cadastroValido = true;

    if (empresaVar == "") {
        input_nomeEmpresa.style.borderColor = "red";
        erro_nomeEmpresa.style = "font-weight: 700; color: red"
        erro_nomeEmpresa.innerHTML = "Empresa deve ser prenchido";
        cadastroValido = false;
    } else {
        erro_nomeEmpresa.style = "font-weight: 700; color: white"
        input_nomeEmpresa.style.borderColor = "white";
        erro_nomeEmpresa.innerHTML = "Empresa";
    }
    
    if (emailVar == "") {
        input_email.style.borderColor = "red";
        erro_email.style = "font-weight: 700; color: red"
        erro_email.innerHTML = "E-mail deve ser prenchido";
        cadastroValido = false;
    } else if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".") == -1) {
        input_email.style.borderColor = "red";
        erro_email.style = "font-weight: 700; color: red"
        erro_email.innerHTML = "E-mail inválido";
        cadastroValido = false;
    } else {
        erro_email.style = "font-weight: 700; color: white"
        input_email.style.borderColor = "white";
        erro_email.innerHTML = "E-mail";
    }
    
    if (nomeResponsavelVar == "") {
        input_nomeResponsavel.style.borderColor = "red";
        erro_nomeResponsavel.style = "font-weight: 700; color: red"
        erro_nomeResponsavel.innerHTML = "Nome deve ser prenchido";
        cadastroValido = false;
    } else {
        erro_nomeResponsavel.style = "font-weight: 700; color: white"
        input_nomeResponsavel.style.borderColor = "white";
        erro_nomeResponsavel.innerHTML = "Nome Responsável";
    }
    
    if (cnpjVar == "") {
        input_cnpj.style.borderColor = "red";
        erro_cnpj.style = "font-weight: 700; color: red"
        erro_cnpj.innerHTML = "CNPJ deve ser prenchido";
        cadastroValido = false;
    } else if (cnpjVar.length < 14) {
        input_cnpj.style.borderColor = "red";
        erro_cnpj.style = "font-weight: 700; color: red"
        erro_cnpj.innerHTML = "CNPJ inválido";
        cadastroValido = false;
    } else {
        erro_cnpj.style = "font-weight: 700; color: white"
        input_cnpj.style.borderColor = "white";
        erro_cnpj.innerHTML = "CNPJ";
    }
    
    if (senhaVar == "") {
        input_senha.style.borderColor = "red";
        erro_senha.style = "font-weight: 700; color: red"
        erro_senha.innerHTML = "Senha deve ser prenchida";
        cadastroValido = false;
    } else if (senhaVar.length < 7) {
        input_senha.style.borderColor = "red";
        erro_senha.style = "font-weight: 700; color: red"
        erro_senha.innerHTML = "Senha muito pequena";
        cadastroValido = false;
    } else {
        erro_senha.style = "font-weight: 700; color: white"
        input_senha.style.borderColor = "white";
        erro_senha.innerHTML = "Senha";
    }
    
    if (confirmacaoSenhaVar == "") {
        input_confirmaSenha.style.borderColor = "red";
        erro_repetir_senha.style = "font-weight: 700; color: red"
        erro_repetir_senha.innerHTML = "Repetir senha deve ser prenchida";
        cadastroValido = false;
    } else if (confirmacaoSenhaVar != senhaVar) {
        input_confirmaSenha.style.borderColor = "red";
        erro_repetir_senha.style = "font-weight: 700; color: red"
        erro_repetir_senha.innerHTML = "As senhas devem ser identicas";
        cadastroValido = false;
    } else {
        erro_repetir_senha.style = "font-weight: 700; color: white"
        input_confirmaSenha.style.borderColor = "white";
        erro_repetir_senha.innerHTML = "Repetir Senha";
    }
    
    if (cadastroValido) {
        console.log("Cadastro concluído")
    }
}

function entrar() {
    var usuarioVar = document.getElementById("input_usuario").value;
    var senhaVar = document.getElementById("input_senha").value;
    var loginValido = true;

    if (usuarioVar == "") {
        input_usuario.style.borderColor = "red";
        erro_usuario.style = "font-weight: 700; color: red"
        erro_usuario.innerHTML = "Usuário deve ser prenchido";
        loginValido = false;
    }
    
    if (senhaVar == "") {
        input_senha.style.borderColor = "red";
        erro_senha.style = "font-weight: 700; color: red"
        erro_senha.innerHTML = "Senha deve ser prenchido";
        loginValido = false;
    }
    
    if (usuarioVar != 'Techmentor' || senhaVar != '12345678'){
        input_senha.style.borderColor = "red";
        erro_senha.style = "font-weight: 700; color: red"
        erro_senha.innerHTML = "Senha inválida";
        
        input_usuario.style.borderColor = "red";
        erro_usuario.style = "font-weight: 700; color: red"
        erro_usuario.innerHTML = "Usuário inválido";
        loginValido = false;
    } else {
        console.log("Login concluído")
        window.location.href = './dashboard/home.html';
    }

}


function mudarOlho(olho, local) {
    if (local == "cadastro") {
        if (olho.id == "olho_senha") {
            if (olho.src[olho.src.length - 6] == "d") {
                olho_senha.src = "assets/icone-senha-aberto.jpg"
                input_senha.type = "text"
            } else {
                olho_senha.src = "assets/icone-senha-fechado.jpg"
                input_senha.type = "password"
            }
        } else {
            if (olho.src[olho.src.length - 6] == "d") {
                olho_repetir_senha.src = "assets/icone-senha-aberto.jpg"
                input_confirmaSenha.type = "text"
            } else {
                olho_repetir_senha.src = "assets/icone-senha-fechado.jpg"
                input_confirmaSenha.type = "password"
            }
        }
    } else {
        if (olho.id == "olho_senha") {
            if (olho.src[olho.src.length - 6] == "d") {
                olho_senha.src = "assets/icone-senha-aberto.jpg"
                input_senha.type = "text"
            } else {
                olho_senha.src = "assets/icone-senha-fechado.jpg"
                input_senha.type = "password"
            }
        }
    }
}

function abrirEmail() {
    window.open("mailto:tech.mentor.project@gmail.com?subject=Desejo adquirir um serviço&body=Planos:%0A%0AR$999,99 por mês: plano bronze com acesso a cidades sem antenas%0AR$1499,99 por mês: plano prata com acesso a empresas que estão no raio%0AR$1899,99 por mês: plano ouro com acesso a diversos dados de aumento e diminuição populacional%0AR$2299,99 por mês: plano black com acesso a bairros e locais exatos sem antenas%0A%0APlano escolhido (adicione abaixo o plano desejado):", "_blank");
}