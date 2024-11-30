const deleteButtons = document.querySelectorAll('.remove-button');
const modalContainer = document.getElementById('modal-container');
const confirmDelete = document.getElementById('confirm-delete');
const cancelDelete = document.getElementById('cancel-delete');

const editButtons = document.querySelectorAll('.edit-button');
const editModalContainer = document.getElementById('edit-modal-container');
const saveEditButton = document.getElementById('save-edit');
const cancelEditButton = document.getElementById('cancel-edit');

const addUserButton = document.getElementById('add-user-btn');
const userModalContainer = document.getElementById('user-modal-container');
const cancelButton = document.getElementById('cancel-btn');
const userForm = document.getElementById('user-form');


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
        editModalContainer.style.display = 'flex';
    });
});

cancelEditButton.addEventListener('click', () => {
    editModalContainer.style.display = 'none';
});

saveEditButton.addEventListener('click', (e) => {
    e.preventDefault();
    editModalContainer.style.display = 'none';
});

addUserButton.addEventListener('click', () => {
    userModalContainer.style.display = 'flex';
});

cancelButton.addEventListener('click', () => {
    userModalContainer.style.display = 'none';
});

userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const cargo = document.getElementById('cargo').value;

    console.log({ nome, cpf, email, cargo });

    userModalContainer.style.display = 'none';
});

