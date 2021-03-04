let blocHTML = document.getElementById('remerciements');
let check = localStorage.getItem('panier');
let panier = JSON.parse(check);
checkPanier(panier);
let longueur = Object.keys(panier).length;
let prixTotal = localStorage.getItem('total');
let totalId = document.getElementById('total');


mainRemerciements();
affichageTotal(prixTotal);

function checkPanier(panier) {
  if (panier == null) {
    blocHTML.innerHTML = `
        <div class="row m-5">
          <div class="col">
            <p class="text-center alert alert-danger" role="alert">Votre panier était vide ! La commande n'a pas été passée.</p>
          </div>
        </div>
        `;
    throw new FatalError("Le panier est introuvable !");
  }

}


function mainRemerciements() {
  order = JSON.parse(localStorage.getItem('order'))
  try {
    if (longueur > 0) {
      blocHTML.innerHTML = `
    <div class="row">
        <div class="col text-center">
          <img src="images/thankyou.jpg" alt="Ours remerciements" class="img-fluid w-25">
        </div>
      </div>
      <div class="row m-5">
        <div class="col">
          <p class="text-center alert alert-success" role="alert">Merci d'avoir passé commande chez nous ` + order.contact.firstName + ` !</p>
          <p class="text-center alert alert-success" role="alert">Commande numéro : ` + order.orderId + ` !</p>
          <br>
          <p><strong>Récupitulatif de la commande :</strong></p>
        </div>
      </div>
      <section id="liste_items">
        </section>
      `;
      recapPanier(longueur);
      deletePanier();
    }
  } catch {
    console.log("Une erreur est survenue lors de l'affichage du panier.")
  }
}

function affichageTotal(prixTotal) {
  const newElement = document.createElement('div');
  totalId.appendChild(newElement);
  newElement.classList.add('col');
  newElement.innerHTML = `<p>Prix total = <strong>` + prixTotal + ` €</strong></p>`;
}


function recapPanier(longueur) {
  try {
    if (longueur > 0) {
      var i = 0;
      do {
          getApi('GET', 'http://localhost:3000/api/teddies/' + panier[i])
          .then(function (e) {
              teddies = JSON.parse(e.target.response);
              getTeddies(teddies);
          }, function (e) {
              console.log("Une erreur est survenu dans la récupération des données.")
          });
          i++
      } while (longueur != i)
  } else {
      element.innerHTML = `<div class="row"><div class="col" m-auto"><p class="alert alert-danger role="alert">Votre panier est vide</p></div></div>`;
  }
  } catch {
    console.log("Une erreur est survenue lors de l'affichage des produits dans le panier")
  }
}

function deletePanier() {
  try {
    localStorage.removeItem('panier');
  } catch {
    console.log("Une erreur est survenue lors de la suppression du panier")
  }
}



function FatalError() {
  Error.apply(this, arguments);
  this.name = "FatalError";
  console.log("Le panier est inexistant, le script va maintenant s'arrêter.")
}
FatalError.prototype = Object.create(Error.prototype);

function getApi(method, url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open(method, url);
    request.onload = resolve;
    request.onerror = reject;
    request.send();
  });
}


function getTeddies(teddies) {
  let element = document.getElementById('liste_items');
      const newElement = document.createElement('div');
      element.appendChild(newElement);
      newElement.classList.add('row');
      newElement.innerHTML = `
      <div class="col">
      <p><strong>`+ teddies.name + `</strong></p>
      </div>
      <div class="col">
      <p><strong>`+ teddies.price + ` €</strong></p>
      </div>
      `
}