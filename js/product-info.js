let imgs = "";
let rels = "";
let relImg = "";


function setRelProduct(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}
document.addEventListener('DOMContentLoaded', function () {
  const url = PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE;
  fetch(url).then(res => res.json()).then(data => {
    document.getElementById("infoProduct").innerHTML += `<div class="card"><p><h2>${data.name}</h2></p>
    <p><strong>Descripción:</strong> ${data.description}.</p>
    <p><strong>Precio:</strong> ${data.currency} ${data.cost}.</p>
    <p><strong>Vendido:</strong>  ${data.soldCount} unidades.</p>
    <p><strong>Categoría:</strong> ${data.category}.</p>
    <p><strong>Imágenes meramente ilustrativas:</strong></p></div>
    `
    //Muestro los comentarios
    function showComments() {
      const urlComments = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE;
      fetch(urlComments).then(res => res.json()).then(data => {
        for (let i = 0; i < data.length; i++) {
          let score = data[i].score;
          //Muestro score en formato estrellas
          if (score == 1) {
            document.getElementById("comments").innerHTML += `<span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>`
          } if (score == 2) {
            document.getElementById("comments").innerHTML += `<span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>`
          } if (score == 3) {
            document.getElementById("comments").innerHTML += `<span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>`
          } if (score == 4) {
            document.getElementById("comments").innerHTML += `<span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>`
          } if (score == 5) {
            document.getElementById("comments").innerHTML += `<span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>`
          }

          let description = data[i].description;
          let user = data[i].user;
          let date = data[i].dateTime;
          document.getElementById("comments").innerHTML += `<div class="row">
          <p class="com">${description}</p>
          <p class="com">${user}</p>
          <p class="com">${date}</p></div`
        }
      })
    }
    showComments()
    nuevoComentario()

    //Función agregar nuevo comentario
    const contenedor = document.getElementById("comments")
    function nuevoComentario() {
      const btnComentar = document.getElementById("btnComentar");
      const puntaje = document.getElementById("puntos");
      const txtArea = document.getElementById("txtComentar");

      btnComentar.addEventListener('click', () => {
        if (puntaje.value == 1) {
          contenedor.innerHTML += `<span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>`
        } if (puntaje.value == 2) {
          contenedor.innerHTML += `<span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>`
        } if (puntaje.value == 3) {
          contenedor.innerHTML += `<span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>`
        } if (puntaje.value == 4) {
          contenedor.innerHTML += `<span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>`
        } if (puntaje.value == 5) {
          contenedor.innerHTML += `<span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>`
        }
        contenedor.innerHTML += `<div class="row">
          <p class="com">${txtArea.value}</p>
          </div`
      })
    }


    //Muestro imágenes del producto
    function showImgsAndRelProds(data) {
      for (let i = 0; i < data.images.length; i++) {
        let imgContenedor = document.getElementById("infoProduct");
        imgs = data.images[i];
        const img = document.createElement('img')
        //Modifico los atributos de la imagen
        img.src = imgs
        img.alt = "product_image"
        img.id = "imgID"
        //Agrego la imagen
        imgContenedor.appendChild(img)
      }

      //Productos relacionados y sus imgs
      for (let i = 0; i < data.relatedProducts.length; i++) {
        let relList = document.getElementById("relProducts");
        relID = data.relatedProducts[i].id;
        rels = data.relatedProducts[i].name;
        relImg = data.relatedProducts[i].image;
        const prel = document.createElement('p');
        const imgRel = document.createElement('img');
        //Modifico los atributos de la imagen
        imgRel.src = relImg;
        imgRel.id = "relImg"
        //Agrego nombre e imagen de producto relacionado
        relList.appendChild(imgRel)
        prel.innerHTML += `<div onclick="setRelProduct(${relID})" class="list-group-item list-group-item-action cursor-active">${rels}</div>`;
        relList.appendChild(prel);
      }
    }

    showImgsAndRelProds(data)
  })
})






