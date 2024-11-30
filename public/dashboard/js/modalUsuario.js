const deleteButtons = document.querySelectorAll('.remove-button');
const modalContainer = document.getElementById('modal-container');
const confirmDelete = document.getElementById('confirm-delete');
const cancelDelete = document.getElementById('cancel-delete');

const editButtons = document.querySelectorAll('.edit-button');
const editModalContainer = document.getElementById('edit-modal-container');
const saveEditButton = document.getElementById('save-edit');
const cancelEditButton = document.getElementById('cancel-edit');


let currentUser = null;

let userToDelete = null;

deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        console.log("CLICOU");
        userToDelete = document.querySelectorAll('.user-item')[index + 1];
        console.log(userToDelete);

        modalContainer.style.display = 'flex';
    });
});

confirmDelete.addEventListener('click', () => {
    console.log('Excluindo o usuário:', userToDelete);
    window.location.href = "./cadastroUsuario.html";
    modalContainer.style.display = 'none';
});

cancelDelete.addEventListener('click', () => {
    modalContainer.style.display = 'none';
});

editButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        console.log("Editando usuário");
        // Exibe o modal
        editModalContainer.style.display = 'flex';
    });
});

// Evento de cancelar a edição
cancelEditButton.addEventListener('click', () => {
    editModalContainer.style.display = 'none'; // Oculta o modal
});

// Evento de salvar as alterações
saveEditButton.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o envio do formulário
    // Feche o modal
    editModalContainer.style.display = 'none';
});


