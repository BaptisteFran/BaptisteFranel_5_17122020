
localStorage.removeItem('id');
// CHARGEMENT DES OURS EN PELUCHE
var request_teddies = new XMLHttpRequest();

request_teddies.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    for (let i of response) {
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
}
request_teddies.open("GET", "http://localhost:3000/api/teddies");
request_teddies.send();





