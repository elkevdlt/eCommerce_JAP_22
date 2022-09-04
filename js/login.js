document.addEventListener("DOMContentLoaded", function () {

  //Traigo los elementos input y boton y los guardo en constantes
  const usuario = document.getElementById("usr");
  const contraseña = document.getElementById("pass");
  const botonIngresar = document.getElementById("but");

  //Evento click del botón, que al hacer click en él ejecuta la función y evalua si los campos estan vacíos. El tipo de función utilizado es tipo flecha.
  botonIngresar.addEventListener('click', () => {
    if ((usuario.value.length == 0) || (contraseña.value.length == 0)) {
      alert('Advertencia!: Por favor, ingrese usuario y contraseña.');
    } else {
      window.location = "portada.html"; //Redirecciona a la página principal
    }
    //Guardo en localStorage el usuario ingresado, tomo ese dato y lo muestro con DOM.
    /* let sessionDataJSON = JSON.stringify(sessionData); */
    localStorage.setItem("user", usuario.value); // Guardo usuario, con key user.
    //if (localStorage.getItem("user")) {
    /* usrData = localStorage.getItem("usr").value; */
    /* sessionData = JSON.parse(sessionDataJSON); */
    //}

  })
})

