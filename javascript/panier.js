let element = document.getElementById('article');
let totalPrice = document.getElementById('total');

panier = getPanier();
longueur = getPanierLongueur(panier);
AffPanier(longueur);
var total = [];

function AffPanier(longueur) {
    if (longueur > 0) {
        var i = 0;
        do {
            getApi('GET', 'http://localhost:3000/api/teddies/' + panier[i])
                .then(function (e) {
                    teddies = JSON.parse(e.target.response);
                    getTeddies(teddies);
                    calcTotal(teddies, longueur);
                }, function (e) {
                    console.log("Une erreur est survenu dans la récupération des données.")
                });
            i++
        } while (longueur != i)
    } else {
        element.innerHTML = `<div class="row"><div class="col" m-auto"><p class="alert alert-danger role="alert">Votre panier est vide</p></div></div>`;
    }
}

function getPanier() {
    let oldPanier = localStorage.getItem('panier');
    let panier = JSON.parse(oldPanier);
    return panier;
}

function getPanierLongueur(panier) {
    if (panier != null) {
        longueur = Object.keys(panier).length;
    } else {
        longueur = 0;
    }
    return longueur;
}


function deleteItem(id) {
    panier.splice(id, 1);
    let panierArray = JSON.stringify(panier);
    localStorage.setItem('panier', panierArray);
    document.location.reload();
}

function affichageTotal(total) {
    const newTotal = document.createElement('div');
    totalPrice.appendChild(newTotal);
    newTotal.innerHTML = `<div class="row mt-5"><div class="col-6 m-auto"><p>Montant total du panier : <strong>` + total + ` €</strong></p></div></div>`;
}

function sendCommand(event) {
    event.preventDefault();
    let products = panier;
    let contact = {
        firstName: document.getElementById('prenom').value,
        lastName: document.getElementById('nom').value,
        address: document.getElementById('adresse').value,
        city: document.getElementById('ville').value,
        email: document.getElementById('email').value
    }
    let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let regexString = /^[a-zA-Z]*$/;
    let regexAddress = /^[a-z0-9\s,'-]*$/i;

    if (products == null || products == undefined) {
        alert("Le panier est vide");
    }

    if (contact.firstName == "" || contact.lastName == "" || contact.address == "" || contact.city == "" || contact.email == "") {
        alert("Veuillez remplir les champs obligatoires (*)")
    } else if (!contact.email.match(regexEmail)) {
        alert("Le format de l'addresse mail est incorrect")
    } else if (!contact.lastName.match(regexString)) {
        alert("Le format du nom est incorrect")
    } else if (!contact.firstName.match(regexString)) {
        alert("Le format du prénom est incorrect")
    } else if (!contact.city.match(regexString)) {
        alert("Le format de la ville est incorrect")
    } else {
        if (typeof (products) == "object" && typeof (contact) == "object") {
            fetch(new Request('http://localhost:3000/api/teddies/order', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            }), {
                body: JSON.stringify({ contact , products }),
            })
                .then(response => response.json())
                .then(json => { localStorage.setItem('order', JSON.stringify(json)), window.location.href = "remerciements.html#" + json.orderId })
                .catch(e => console.error)
        } else {
            console.log("Mauvais type de données.")
        }
    }
}


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
    var id = panier.indexOf(teddies._id);
    console.log(id);
    const newElement = document.createElement('tr');
    element.appendChild(newElement);
    newElement.innerHTML = `<td scope="row" class="text-center"><p><strong>` + teddies.name + `</strong></p></td><td class="text-center"><img class="img-fluid rounded w-25" src="` + teddies.imageUrl + `"></td><td class="text-center price" value="` + teddies.price + `">` + teddies.price + ` €</td><td class="text-center">
                <input type="button" class="btn btn-danger" value="Supprimer" onClick="deleteItem(` + id + `);"></td>`;
}

function calcTotal(teddies, longueur) {
    var prixTotal = 0;
    price = parseInt(teddies.price);
    total.push(price);
    if (total.length == longueur) {
        for (i = 0; i < longueur; i++) {
            prixTotal += total[i];
        }
        affichageTotal(prixTotal);
        localStorage.setItem('total', prixTotal);
    }
}