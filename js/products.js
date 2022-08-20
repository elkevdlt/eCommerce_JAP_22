let listaDeAutos = [];

//funcion que muesta listado de autos, recibe como parametro el array donde se cargan los datos consultados. Accedo a los productos y los recorro con el for, mediante indice accedo a los autos y los guardo en variable. Con DOM creo el contenedor necesario para mostrar los datos requeridos.
function showAutosList(listaDeAutos) {
  let autoToAppend = "";
  for (let i = 0; i < listaDeAutos.products.length; i++) {
    let autos = listaDeAutos.products[i];

    autoToAppend += `<div onclick="setCatID(${autos.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${autos.image}" alt="${autos.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${autos.name}</h4>
                            <small class="text-muted">${autos.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${autos.description}</p>
                    </div>
                </div>
            </div>` //cost,name,description,soldCount,image
  }
  document.getElementById("listaAutos").innerHTML += autoToAppend;
}

//Escucha de evento cuando se cargue todo el documento, ejecuta la funcion getJSONData la cual le paso como parametro la url de products correspondiente a autos. Chequeo el status del resultado de la consulta, si es ok guardo los datos en variable. LLamo a la funcion showAutosList().
document.addEventListener("DOMContentLoaded", function () {
  getJSONData(PRODUCTS_URL + "101.json").then(resultObj => {
    if (resultObj.status === "ok") {
      listaDeAutos = resultObj.data;
      /* console.log(listaDeAutos.products); */
      showAutosList(listaDeAutos);
    } else {
      alert("Ha ocurrido un error");
    }
  })
});
