function getApi(method, url) {
  return new Promise(function (resolve, reject){
    var request = new XMLHttpRequest();
    request.open(method, url);
    request.onload = resolve;
    request.onerror = reject;
    request.send();
  });
}

getApi('GET', 'http://localhost:3000/api/teddies')
  .then(function(e){
    teddies = JSON.parse(e.target.response);
    recupObjet(teddies);
  }, function(e) {
    console.log("Une erreur est survenu dans la récupération des données.")
  });


function recupObjet(obj) {
  try {
    for (let i of obj) {
      let newElement = document.createElement('div');
      let element = document.getElementById('teddy-card');
      type = typeof(i._id);
      element.appendChild(newElement);
      newElement.classList.add("col-12", "col-lg-4", "mt-5");
      newElement.innerHTML = `<div class="card shadow-sm"><img class="img-fluid" src="${i.imageUrl}"
       alt="${i.name}">
       <div class="card-body">
       <h5 class="card-title">${i.name}</h5>
       <p class="card-text"><strong>${i.price}€</strong></p>
       <p class="card-text">${i.description}</p>
       <a href="produit.html" class="btn btn-primary" id="${i._id}">
       Voir le produit</a>
       </div>
       </div>`;
  
      // RECUPERATION ID PELUCHE
      let teddy_id = document.getElementById(i._id);
      teddy_id.addEventListener('click', function () {
        // ajouter id dans url
        document.getElementById(i._id).href = "produit.html#" + i._id;
      });
    }
  } catch {
    console.log("Nous n'avons pas pu afficher les produits.")
  }
  
}
