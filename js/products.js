let listaDeProductos = [];
let infoDeProducto = [];
let minCost = undefined;
let maxCost = undefined;

function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}
//funcion que muesta listado de autos, recibe como parametro el array donde se cargan los datos consultados. Accedo a los productos y los recorro con el for, mediante indice accedo a los autos y los guardo en variable. Con DOM creo el contenedor necesario para mostrar los datos requeridos.
function showProductList(listaDeProductos) {

  let productToAppend = "";
  for (let i = 0; i < listaDeProductos.products.length; i++) {
    /* console.log(typeof (minCost));
    console.log(typeof (maxCost)); */
    let product = listaDeProductos.products[i];
    product.cost = parseInt(product.cost); //Parseo a entero el costo del producto.
    if ((product.cost >= minCost || minCost == undefined) && (product.cost <= maxCost || maxCost == undefined)) {
      productToAppend += `<div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>` //cost,name,description,soldCount,image
    }
    document.getElementById("listaAutos").innerHTML = productToAppend;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("rangeFilterCost").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    if (document.getElementById("rangeFilterCostMin").value != "") {
      minCost = parseInt(document.getElementById("rangeFilterCostMin").value);
    } else { minCost = undefined; }
    if (document.getElementById("rangeFilterCostMax").value != "") {
      maxCost = parseInt(document.getElementById("rangeFilterCostMax").value);
    } else { maxCost = undefined; }

    /*   if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
        minCost = parseInt(minCost);
      }
      else {
        minCost = undefined;
      }
  
      if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
        maxCost = parseInt(maxCost);
      }
      else {
        maxCost = undefined;
      } */

    showProductList(listaDeProductos);
  });

  //Función botón limpiar
  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductList(listaDeProductos);
  });

  //Orden descendente según el costo de producto
  document.getElementById("sortDesc").addEventListener('click', () => {
    listaDeProductos.products.sort(function (a, b) {
      if (parseInt(a.cost) > parseInt(b.cost)) {
        return -1;
      }
      if (parseInt(a.cost) < parseInt(b.cost)) {
        return 1;
      }
      return 0;
    });

    showProductList(listaDeProductos);
  })
  //Orden ascendente según el costo de producto
  document.getElementById("sortAsc").addEventListener('click', () => {
    listaDeProductos.products.sort(function (a, b) {
      if (parseInt(a.cost) > parseInt(b.cost)) {
        return 1;
      }
      if (parseInt(a.cost) < parseInt(b.cost)) {
        return -1;
      }
      return 0;
    });

    showProductList(listaDeProductos);
  })
  //Orden según artículos vendidos
  document.getElementById("sortBySoldCount").addEventListener('click', () => {
    listaDeProductos.products.sort(function (a, b) {
      return parseInt(b.soldCount) - parseInt(a.soldCount);
    });
    showProductList(listaDeProductos);
  })
})


//Escucha de evento cuando se cargue todo el documento, ejecuta la funcion getJSONData la cual le paso como parametro la url de products correspondiente a autos. Chequeo el status del resultado de la consulta, si es ok guardo los datos en variable. LLamo a la funcion showAutosList().
document.addEventListener("DOMContentLoaded", function () {
  getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(resultObj => {
    if (resultObj.status === "ok") {
      listaDeProductos = resultObj.data;
      /* console.log(listaDeAutos.products); */
      showProductList(listaDeProductos);
    } else {
      alert("Ha ocurrido un error");
    }
  })
});

