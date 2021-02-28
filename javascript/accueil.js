var request_teddies = new XMLHttpRequest();

getApi(request_teddies);

function getApi (request) {
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      var response = JSON.parse(this.responseText);
      recupObjet(response);
    }
  }
    openApi(request);
}

function recupObjet(obj) {
  for (let i of obj) {
    let newElement = document.createElement('div');
    let element = document.getElementById('teddy-card');
    element.appendChild(newElement);
    newElement.classList.add("col-12", "col-lg-4", "mt-5");
    newElement.innerHTML = `<div class="card shadow-sm"><img class="img-fluid" src="${i.imageUrl}"
     alt="${i.name}"><div class="card-body"><h5 class="card-title">${i.name}
     </h5><p class="card-text"><strong>${i.price}€</strong></p><p class="card-text">${i.description}
     </p><a href="produit.html" class="btn btn-primary stretched-link" id="${i._id}">
     Voir le produit</a></div></div></div>`;

    // RECUPERATION ID PELUCHE
    let teddy_id = document.getElementById(i._id);
    teddy_id.addEventListener('click', function () {
      // ajouter id dans url
      let product_url = document.getElementById(i._id).href = "produit.html#" + i._id;;
    });
  }
}

function openApi(request) {
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
  }