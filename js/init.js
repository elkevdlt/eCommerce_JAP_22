//Se declaran las constantes con las url donde traer los datos
const CATEGORIES_URL = /* "http://localhost:3000/cats" */ "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const botonIngresar = document.getElementById("but");


//Funciones de los spinners (indicador de carga)
let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

//Se crea la función Fetch para realizar las consultas
let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}
//Agrega el usuario ingresado en el login al nav.
document.addEventListener('DOMContentLoaded', () => {
  let navLogin = document.getElementById("usrNav");
  navLogin.innerHTML = `
  <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
    ${localStorage.getItem("user")}
  </button>
  
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="index.html" id="cerrarSesion">Cerrar sesión</a></li>
  </ul>
</div>`
  //remueve el usuario de localStorage al hacer click en cerrar sesion
  let sesion = document.getElementById("cerrarSesion");
  sesion.addEventListener('click', () => {
    localStorage.removeItem("user")

  })
})


