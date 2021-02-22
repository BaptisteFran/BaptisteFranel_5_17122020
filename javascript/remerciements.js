let blocHTML = document.getElementById('remerciements');
let check = localStorage.getItem('panier');
let panier = JSON.parse(check);
let longueur = Object.keys(panier).length;
let prixTotal = localStorage.getItem('total')

if (longueur > 0) {
    blocHTML.innerHTML = `
    <div class="row">
        <div class="col text-center">
          <img src="images/thankyou.jpg" alt="Ours remerciements" class="img-fluid w-25">
        </div>
      </div>
      <div class="row m-5">
        <div class="col">
          <p class="text-center alert alert-success" role="alert">Merci d'avoir passé commande chez nous !</p>
          <br>
          <p><strong>Récupitulatif de la commande :</strong></p>
        </div>
      </div>
      <section id="liste_items">
        </section>
      `;
    for (var i = 0; i < longueur; i++) {
        let element = document.getElementById('liste_items');
        const newElement = document.createElement('div');
        element.appendChild(newElement);
        newElement.classList.add('row');
        newElement.innerHTML = `
        <div class="col">
        <p><strong>`+ panier[i].name + `</strong></p>
        </div>
        <div class="col">
        <p><strong>`+ panier[i].price + ` €</strong></p>
        </div>
        <div class="col">
        <p>Prix total = <strong>`+ prixTotal + ` €</strong></p>
        </div>
        `
    }
    localStorage.removeItem('panier');
} else {
    blocHTML.innerHTML = `
      <div class="row m-5">
        <div class="col">
          <p class="text-center alert alert-danger" role="alert">Votre panier était vide ! La commande n'a pas été passée.</p>
        </div>
      </div>
      `;
}
