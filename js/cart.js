document.addEventListener('DOMContentLoaded', function () {
  const url = CART_INFO_URL + "25801" + EXT_TYPE;
  console.log(url);
  fetch(url).then(res => res.json()).then(data => {
    for (let i = 0; i < data.articles.length; i++) {
      /* console.log(data); */
      console.log(data.articles[i]);
      let dato = data.articles[i];
      document.getElementById("cartProd").innerHTML += `
      <div class="container">
        <div class="row">
          <div class="col"> 
            <table class="table align-middle">
              <thead>
                <tr></tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Unidades</th>
                  <th>Precio</th>
                <tr></tr>
              </thead>

              <tbody>
                <tr>
                  <td><img src="${dato.image}" class="img-thumbnail" id="imgCart"></td>
                  <td><p>${dato.name}</p></td>
                  <td><input type="number" id="inputCart" min="1" value="${dato.count}"></td>
                  <td><p id="costoCart">${dato.currency} ${dato.unitCost}</p></td>
                </tr>
              </tbody>
            </table>
          </div>  
        </div>
      </div>
      `


      let costo = parseInt(dato.unitCost);
      let moneda = dato.currency;
      let cantidad = document.getElementById("inputCart")

      cantidad.addEventListener('change', () => {
        subtotal = cantidad.value * costo;
        /* console.log("cambiaste"); */
        //chequeado(subtotal)
        document.getElementById("costoCart").innerHTML = moneda + " " + subtotal
        let costoEnvio = document.getElementById("subtotalInfo")
        costoEnvio.innerHTML = `
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Subtotal</th>
              <th>Envio</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>${moneda + " " + subtotal}</td> <td>${moneda + " " + chequeado(subtotal)}</td> <td>${moneda} ${subtotal + chequeado(subtotal)}</td>
            </tr>
          </tbody>

        </table>
        
          `
      })
    }
  })

  function chequeado(subtotal) {
    let envio1 = document.getElementById("envio1");
    let envio2 = document.getElementById("envio2");
    let envio3 = document.getElementById("envio3");
    /* console.log(parseFloat(envio1.value) * subtotal);
    console.log(parseFloat(envio2.value) * subtotal); //aca lo muestra en consola
    console.log(parseFloat(envio3.value) * subtotal); */
    if (envio1.checked) {
      /* console.log("soy envio1 del 15 por ciento");
      console.log(parseFloat(envio1.value) * subtotal); */ //pero aca no, da NaN ¿?
      let valorEnvio = parseFloat(envio1.value) * subtotal;
      return valorEnvio;

    }
    if (envio2.checked) {
      /*  console.log("soy envio2 del 7 por ciento");
       console.log(parseFloat(envio2.value) * subtotal); */
      let valorEnvio = parseFloat(envio2.value) * subtotal;
      return valorEnvio;
    }
    if (envio3.checked) {
      /* console.log("soy envio3 del 5 por ciento");
      console.log(parseFloat(envio3.value) * subtotal); */
      let valorEnvio = parseFloat(envio3.value) * subtotal;
      return valorEnvio;
    }
  }
})

let dep = document.getElementById("dep");
let tar = document.getElementById("tar");
let calle = document.getElementById("calle");
let numero = document.getElementById("numero");
let esquina = document.getElementById("esquina");
document.getElementById("btnFinaliza").addEventListener('click', function (e) {
  if ((envio1.checked != true) && (envio2.checked != true) && (envio3.checked != true)) {
    alert('Debe elegir un tipo de envío');
  }
  if ((dep.checked != true) && (tar.checked != true)) {
    alert('Debe seleccionar un método de pago!');
  }
})

let credito1 = document.getElementById("creditCard1");
let credito2 = document.getElementById("creditCard2");
let credito3 = document.getElementById("creditCard3");
credito1.disabled = true;
credito2.disabled = true;
credito3.disabled = true;
document.getElementById('dep').addEventListener('click', function (e) {
  credito1.disabled = true;
  credito2.disabled = true;
  credito3.disabled = true;
  deposito.disabled = false;
});

let deposito = document.getElementById("deposito");
deposito.disabled = true;
document.getElementById('tar').addEventListener('click', function (e) {
  deposito.disabled = true;
  credito1.disabled = false;
  credito2.disabled = false;
  credito3.disabled = false;
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if ((calle.value > "") && (numero.value > "") && (esquina.value > "")) {
        alert('Su compra ha sido efectuada de forma exitosa!')
      }
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

/* 
function subTotal(moneda, costo) {
} */