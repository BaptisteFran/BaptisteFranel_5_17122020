let oldPanier = localStorage.getItem('panier');
let panier = JSON.parse(oldPanier);
let longueur = Object.keys(panier).length;
let element = document.getElementById('article');
console.log(longueur);
check = 0;

if (longueur > 0) {
    for (var i = 0; i < longueur; i++) {
        const newElement = document.createElement('div');
        element.appendChild(newElement);
        newElement.innerHTML = `<div class="row mt-5"><div class="col m-auto">` + panier[i].name + `</div><div class="col m-auto"><img class="img-fluid" src="` + panier[i].imageUrl + `"></div><div class="col m-auto"><p>` + panier[i].price + `</p></div><div class="col m-auto">
        <input type="button" class="btn btn-danger" value="Supprimer" onClick="del(` + i + `);"></div></div>`
    
        function del(id) {
            panier.splice(id, 1);
            let panierArray = JSON.stringify(panier);
            localStorage.setItem('panier', panierArray);
            document.location.reload();
        }
    }
} else {
    element.innerHTML = `<div class="row"><div class="col" m-auto"><p class="alert alert-danger role="alert">Votre panier est vide</p></div></div>`;
}


