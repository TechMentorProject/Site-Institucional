function validar() {
    if (sessionStorage.EMAIL_USUARIO == null) {
        window.location = "./../index.html"
    }
}

function deslogar(){
    sessionStorage.clear();
    window.location.href = './../index.html';
}

function validarCargo(pagina) {
    let cargo = sessionStorage.CARGO
    if (cargo.includes(pagina)) {
        window.location.href = './home.html'
    }
}