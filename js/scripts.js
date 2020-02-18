// validar el formulario

const inputs = document.querySelectorAll('form .campo input');

// Listener a los inputs

inputs.forEach(input => {
    input.addEventListener('blur', validarInput)
});
inputs.forEach(input => {
    input.addEventListener('input', validarInput);
});

function validarInput(e) {
    const status = ['valido', 'no-valido'];
    let clase;
    if(e.target.value.length === 0) {
        clase = status[1];
    }else {
        clase = status[0];
    }
    e.target.classList.remove(...status); 
    e.target.nextElementSibling.classList.remove(...status);
    e.target.classList.add(clase); // agregar clase al input
    e.target.nextElementSibling.classList.add(clase); 

    //  inyectar dinamicamente el div con el error
    if (clase === 'no-valido'){
        if (e.target.parentElement.nextElementSibling.classList[0] !== 'alerta') { /*Este if evita que se agreguen multiples mensajes de error */
            // construir un mensaje de error
            const errorDiv = document.createElement('div');
            errorDiv.appendChild(document.createTextNode('Este campo es obligatorio'));
            errorDiv.classList.add('alerta');
            // insertar el error
            e.target.parentElement.parentElement.insertBefore(errorDiv, e.target.parentElement.nextElementSibling);
        }
        
    }else {
        // limpiar el mensaje de error si existe
        if (e.target.parentElement.nextElementSibling.classList[0] === 'alerta') {
            e.target.parentElement.nextElementSibling.remove();
        }
    }
}

// Mostrar u ocultar password

const mostrarPasswordBtn = document.querySelector('form .campo span');
mostrarPasswordBtn.addEventListener('click', e => {
    const passwordInput = document.querySelector('#password');
    if (e.target.classList.contains('mostrar')) {
        // mostrar texto
        e.target.classList.remove('mostrar')
        //  cambiar el texto
        e.target.textContent = 'Ocultar';
        // cambiamos a Password
        passwordInput.type = 'text';
    }else {
        // mostrar el password
        e.target.classList.add('mostrar')
        //  cambiar el texto
        e.target.textContent = 'Mostrar';
        // cambiamos a Password
        passwordInput.type = 'password';
    }
})