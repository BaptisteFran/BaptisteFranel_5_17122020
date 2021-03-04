id = getId();

function getApi(method, url) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(method, url);
        request.onload = resolve;
        request.onerror = reject;
        request.send();
    });
}

getApi('GET', 'http://localhost:3000/api/teddies/' + id)
    .then(function (e) {
        teddies = JSON.parse(e.target.response);
        getProduct(teddies, id);
    }, function (e) {
        console.log("Une erreur est survenu dans la récupération des données.")
    });


function getId() {
    try {
        // On récupere l'url de window
        let url = window.location.href;
        // Je coupe le lien après le #
        let url_slice = url.split("#");
        // J'ai deux strings, je récupère la 2eme et la range dans la variable "id"
        id = url_slice[1];
        return id;
    } catch {
        console.log("Impossible de récupérer l'id")
    }
}

var couleur;


function getProduct(response, id) {
    try {
        const newElement = document.createElement('div');
        let element = document.getElementById('teddy-product');
        element.appendChild(newElement);
        newElement.classList.add('col-12', 'mt-5');
        newElement.innerHTML = `<h1 class="display-4">${response.name}</h1>
                <p class="lead">${response.description}</p>
                <hr class="my-4"><img class="img-fluid" src="${response.imageUrl}" alt="${response.name}">
                <p><strong>${response.price}€</strong></p>
                <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id="colorButton" value="blank">Sélectionnez une couleur
                <span class="caret"></span></button>
                <ul class="dropdown-menu">
                  <li><input type="button" class="dropdown-item" onclick="getColor(this);" value="Rouge"></input></li>
                  <li><input type="button" class="dropdown-item" onclick="getColor(this);" value="Bleu"></input></li>
                  <li><input type="button" class="dropdown-item" onclick="getColor(this);" value="Beige"></input></li>
                </ul>
               </div>
                <a href="panier.html" class="btn btn-primary mt-5" id="add_panier">Ajouter au panier</a>`
        addPanier(id);
    } catch {
        console.log("Un problème est survenu lors de l'affichage du produits.")
    }
}

function getColor(color) {
    try {
        var couleur = color.value;
        var changeButton = document.getElementById('colorButton');
        changeButton.innerHTML = couleur;
        changeButton.value = couleur;
    } catch {
        console.log("Une erreur est survenue lors du choix de la couleur.")
    }
}

function addPanier(id) {
    let ajout_panier = document.getElementById('add_panier');
    try {
        if (localStorage.getItem('panier') == null) {
            ajout_panier.addEventListener('click', function (event) {
                couleur = document.getElementById('colorButton').value;
                if (couleur == 'blank') {
                    event.preventDefault();
                    console.log("Veuillez choisir une couleur");
                } else {
                    panier = new Array;
                    panier.push(id);
                    finalPanier = JSON.stringify(panier);
                    localStorage.setItem('panier', finalPanier);
                }
            })
        } else {
            ajout_panier.addEventListener('click', function (event) {
                couleur = document.getElementById('colorButton').value;
                if (couleur == 'blank') {
                    event.preventDefault();
                    console.log("Veuillez choisir une couleur");
                } else {
                    panierArray = localStorage.getItem('panier');
                    panier = JSON.parse(panierArray);
                    panier.push(id);
                    finalPanier = JSON.stringify(panier);
                    localStorage.setItem('panier', finalPanier);
                }
            });
        }
    } catch {
        console.log("Un problème est survenu lors de la sauvegarde du panier.")
    }
}