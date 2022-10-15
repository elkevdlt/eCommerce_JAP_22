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
      /*  total()
       function total(valor) {
         let costo = document.getElementById("costoCart").value
         costo.innerHTML += `${dato.currency} ${dato.unitCost * valor}`;
 
       } */
      let costo = dato.unitCost;
      let moneda = dato.currency;
      let cantidad = document.getElementById("inputCart")
      cantidad.addEventListener('change', () => {
        /* console.log("cambiaste"); */
        document.getElementById("costoCart").innerHTML = moneda + " " + cantidad.value * costo;
      })
    }
  })
})