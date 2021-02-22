let oldPanier = localStorage.getItem('panier');
let panier = JSON.parse(oldPanier);
if (panier != null) {
    longueur = Object.keys(panier).length;
} else {
    longueur = 0;
}
let element = document.getElementById('article');
let totalPrice = document.getElementById('total');

if (longueur > 0) {
    let total = 0;
    for (var i = 0; i < longueur; i++) {
        let prix = parseInt(panier[i].price);
        total += prix;
        const newElement = document.createElement('tr');
        element.appendChild(newElement);
        newElement.innerHTML = `<td scope="row" td class="text-center"><p><strong>` + panier[i].name + `</strong></p></td><td class="text-center"><img class="img-fluid rounded w-25" src="` + panier[i].imageUrl + `"></td><td class="text-center">` + panier[i].price + ` €</td><td class="text-center">
        <input type="button" class="btn btn-danger" value="Supprimer" onClick="del(` + i + `);"></td>`;
        // Fonction suppression objet
        function del(id) {
            panier.splice(id, 1);
            let panierArray = JSON.stringify(panier);
            localStorage.setItem('panier', panierArray);
            document.location.reload();
        }
    }
    // Calcul prix total
    const newTotal = document.createElement('div');
    totalPrice.appendChild(newTotal);
    newTotal.innerHTML = `<div class="row mt-5"><div class="col m-auto"><p>Montant total du panier : <strong>` + total + ` €</strong></p></div></div>
    <div class="row"><div class="col"><a href="remerciements.html" class="btn btn-primary mt-5" id="commander">Commander</a></div></div>`;
    localStorage.setItem('total', total);
} else {
    element.innerHTML = `<div class="row"><div class="col" m-auto"><p class="alert alert-danger role="alert">Votre panier est vide</p></div></div>`;
}



