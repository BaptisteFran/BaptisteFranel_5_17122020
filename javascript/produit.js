// PRODUIT
var request_product = new XMLHttpRequest();
request_product.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        // On récupere l'url de window
        let url = window.location.href;
        // Je coupe le lien après le #
        let url_slice = url.split("#");
        // J'ai deux strings, je récupère la 2eme et la range dans la variable "id"
        id = url_slice[1];

        // ajouter dans dictionnaire plutôt que localstorage, puis ajouter le dictionnaire au localstorage
        for (i of response) {
            if (id == i._id) {
                const newElement = document.createElement('div');
                let element = document.getElementById('teddy-product');
                element.appendChild(newElement);
                newElement.classList.add('col-12', 'mt-5');
                newElement.innerHTML = `<h1 class="display-4">${i.name}</h1>
                <p class="lead">${i.description}</p>
                <hr class="my-4"><img class="img-fluid" src="${i.imageUrl}" alt="${i.name}">
                <p><strong>${i.price}€</strong></p>
                <a href="panier.html" class="btn btn-primary mt-5" id="add_panier">Ajouter au panier</a>`
                let ajout_panier = document.getElementById('add_panier');
                let objPanier = new Object();
                objPanier.name = i.name;
                objPanier.imageUrl = i.imageUrl;
                objPanier.description = i.description;
                objPanier.price = i.price;
                if (localStorage.getItem('panier') == null) {
                    let panierArray = [];
                    ajout_panier.addEventListener('click', function () {
                        panierArray.push(objPanier);
                        panier = JSON.stringify(panierArray);
                        localStorage.setItem('panier', panier);
                    });
                } else {
                    panierArray = localStorage.getItem('panier');
                    panier = JSON.parse(panierArray);
                    ajout_panier.addEventListener('click', function () {
                        panier.push(objPanier);
                        panierArray = JSON.stringify(panier);
                        localStorage.setItem('panier', panierArray);
                    });
                }
                break;

            }
        }
    }
}

// else ou try/catch
// plusieurs fonctions pour appel, traitement et affichage api
// pas de doublons (duplication de code)
// tester les fonctions

request_product.open("GET", "http://localhost:3000/api/teddies");
request_product.send();
