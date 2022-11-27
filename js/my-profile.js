let camposPerfil = [];
let pNombre = document.getElementById("pNombre");
let pSegundoNombre = document.getElementById("pSegundoNombre");
let pApellido = document.getElementById("pApellido");
let pSegundoApellido = document.getElementById("pSegundoApellido");
let mail = document.getElementById("pMail");
let tel = document.getElementById("pTel");
let btnPerfil = document.getElementById("btnPerfil");

//verificar que exista en LS usuario sino redirige al index.html
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem("user") == null || localStorage.getItem("user") == "") {
    window.location = "index.html";
  } else {
    mail.value = localStorage.getItem("user");
  }

  //Evaluo si los campos obligatorios estan vacios
  btnPerfil.addEventListener('click', () => {
    if ((pNombre.value == "") || (pApellido.value == "") || (mail.value == "")) {
      alert("Rellene campos obligatorios (*)")
    } else {
      camposPerfil.push(pNombre.value, pSegundoNombre.value, pApellido.value, pSegundoApellido.value, mail.value, tel.value);
      //console.log(camposPerfil);
      localStorage.setItem("camposPerfil", JSON.stringify(camposPerfil));

    }
  })
  //asigno los valores a mostrar a los inputs
  let array = JSON.parse(localStorage.getItem("camposPerfil"));
  pNombre.value = array[0]
  pSegundoNombre.value = array[1]
  pApellido.value = array[2]
  pSegundoApellido.value = array[3]
  tel.value = array[5]

})



/*   document.getElementById("mi_imagen").addEventListener("change", () => {
    console.log(this.files);
    let archivo = new FileReader();
    archivo.addEventListener("load", () => {
      console.log(archivo);
      localStorage.setItem("imagen", archivo.result);
    })
    archivo.readAsDataURL(this.files[0]);

  })
  document.addEventListener("DOMContentLoaded", () => {
    let imagen = localStorage.getItem("imagen")
    let inputImg = document.getElementById("imgProfile");
    inputImg.src = imagen

  }) */






