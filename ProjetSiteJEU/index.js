const displayform = _('displayForm')
const forlogin = _('forLogin');
const loginForm = _('loginForm');
const forRegister = _('forRegister');
const registerForm = _('registerForm');
const formContainer = _('formContainer');
displayform.addEventListener('click', showForm);


forlogin.addEventListener('click', () => {
    forlogin.classList.add('active');
    forRegister.classList.remove('active');
    if (loginForm.classList.contains('toggleForm')) {
        formContainer.style.transform = 'translate(0%)';
        formContainer.style.transition = 'transform 0.5s';
        registerForm.classList.add('toggleForm');
        loginForm.classList.remove('toggleForm');
    }
});

forRegister.addEventListener('click', () => {
    forlogin.classList.remove('active');
    forRegister.classList.add('active');
    if (registerForm.classList.contains('toggleForm')) {
        formContainer.style.transform = 'translate(-100%)';
        formContainer.style.transition = 'transform 0.5s';
        registerForm.classList.remove('toggleForm');
        loginForm.classList.add('toggleForm');
    }
});


function _(e) {
    return document.getElementById(e)
}

function showForm() {
    document.querySelector('.form-wrapper .card').classList.toggle('show');
}