document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-confirmacao");
    const btnApagarConta = document.querySelector(".button-apagar-conta");
    const btnConfirmar = document.getElementById("btn-confirmar");
    const btnCancelar = document.getElementById("btn-cancelar");

    btnApagarConta.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    btnCancelar.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    btnConfirmar.addEventListener("click", () => {
        window.location.href = "./telaConfig-func.html";
        modal.classList.add("hidden");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btnMudarSenha = document.getElementById("btn-mudar-senha");
    const popupSucesso = document.getElementById("popup-sucesso");

    btnMudarSenha.addEventListener("click", () => {
        popupSucesso.querySelector("p").textContent = "Senha alterada com sucesso";
        popupSucesso.classList.remove("hidden");
        popupSucesso.classList.add("show");

        setTimeout(() => {
            popupSucesso.classList.remove("show");
            popupSucesso.classList.add("hidden");
        }, 3000);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btnSalvar = document.getElementById("btn-salvar");
    const popupSucesso = document.getElementById("popup-sucesso");

    btnSalvar.addEventListener("click", () => {
        popupSucesso.querySelector("p").textContent = "Dados alterados com sucesso";
        popupSucesso.classList.remove("hidden");
        popupSucesso.classList.add("show");

        setTimeout(() => {
            popupSucesso.classList.remove("show");
            popupSucesso.classList.add("hidden");
        }, 3000);
    });
});

