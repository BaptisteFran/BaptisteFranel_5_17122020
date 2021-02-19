// Récupération des localStorage
clicked = localStorage.getItem('clicked');
elt = document.getElementById('article');
nbPanier = localStorage.getItem('panier');

// Si clicked est vrai et clicked n'est pas null
// clicked = bouton ajouté au panier d'un ours en peluche

if (clicked == 'true' && clicked != null) {
    
    try {
        // récupération des données de l'ours en peluche
    teddyName = localStorage.getItem('name');
    teddyImage = localStorage.getItem('imageUrl');
    teddyPrice = localStorage.getItem('price');

    // si nbPanier n'est pas nul, on converti le string en int
    if (nbPanier != null) {
        nbPanier = parseInt(nbPanier);
        // sinon (nbPanier est null) on l'initie à 0
    } else {
        nbPanier = 0;
    }
    // On incrémente nbPanier parce qu'on a ajouté quelque chose au panier
    nbPanier++;
    // on met un localstorage panier avec les données de nbPanier
    localStorage.setItem('panier', nbPanier);

    // on initialise l'objet ours (teddy)
    var teddyName = { 'name': teddyName, 'image': teddyImage, 'price': teddyPrice, 'id': nbPanier };

    // on donne comme nom de clé le numéro de nbPanier et passe en json l'objet ours
    localStorage.setItem(nbPanier, JSON.stringify(teddyName));

    // initialisation des variables cnt (count) et total

    cnt = 0; // la variable cnt sert à itérer dans les objets ajoutés au panier
    total = 0; // la variable total nous servira à calculer le prix total du panier

    // temps que count est différent de nbPanier
    while (cnt != nbPanier) {

        // on créé une variable qui récupère le item du localStorage cnt+1
        var retrievedObject = localStorage.getItem(cnt + 1); // Ajout de +1 car cnt initialise à 0, et qu'on va itérer sur nbPanier qui sera au dessus de 0
        var obj = JSON.parse(retrievedObject); // on "décompresse" le json pour récupérer l'objet dans la variable obj

        total += parseInt(obj.price); // on ajoute au total le prix de l'objet avec un parseInt pour faire l'opération (le prix de l'objet étant stocké en string)

        // on créé une nouvelle variable qui créé une div
        const newElement = document.createElement('div');
        // on ajoute newElement à elt (l'élément article)
        elt.appendChild(newElement);
        // on ajoute le HTML à ce nouvel élément avec les obj.name, image, prix
        newElement.innerHTML = `<div class="row m-5 border shadow-sm"><div class="col m-auto"><p class="text-center"><strong>` + obj.name + `
    </strong></p></div><div class="col m-auto">
    <img  class="img-fluid" src=`+ obj.image + `></div>
    <div class="col m-auto"><p class="text-center"><strong>`+ obj.price + ` €</strong></p></div><div class="col m-auto"><button type="button" class="btn btn-danger" id="` + obj.id + `>Supprimer</button></div></div>`;

        // on récupère l'élément total
        var totalDiv = document.getElementById('total');
        // on y ajoute le html avec le prix total calculé
        totalDiv.innerHTML = `<p>Prix total : <strong>` + total + ` €</strong></p>`

        // on ajoute +1 à cnt qui nous permet de boucler sur le 2, puis 3, 4 etc...
        cnt++;


        // ajouter un test pour ne pas boucler à l'infini
    }


    // une fois l'article ajouté au panier, on remove les localStorage, au cas ou on revient sur une autre page, puis qu'on revienne dans le panier
    // pour ne pas qu'un nouvel objet soit rajouté
    localStorage.removeItem('name');
    localStorage.removeItem('imageUrl');
    localStorage.removeItem('price');
    localStorage.removeItem('clicked');
    } catch (error){
        console.log(error)
    }
    

    // sinon
} else {

    // si nbPanier est à 0 ou si il est null
    if (nbPanier == 0 || nbPanier === null) {
        // le panier est vide, on affiche un message disant que le panier est vide
        elt.innerHTML = `<div class="row"><div class="col" m-auto"><p class="alert alert-danger role="alert">Votre panier est vide</p></div></div>`;
        // si nbPanier n'est ni à 0 ni null et que clicked n'est pas vrai
    } else {
        try {
            // initialisation des variables de comptage
        cnt = 0;
        total = 0;
        cntId = 0;

        // temps que cnt est différent de nbPanier
        while (cnt != nbPanier) {

            // on répète la boucle pour ajouter les objets
            var retrievedObject = localStorage.getItem(cnt + 1);
            var obj = JSON.parse(retrievedObject);
            total += parseInt(obj.price);


            const newElement = document.createElement('div');
            elt.appendChild(newElement);
            newElement.innerHTML = `<div class="row m-5 border shadow-sm"><div class="col m-auto"><p class="text-center"><strong>` + obj.name + `
        </strong></p></div><div class="col m-auto">
        <img  class="img-fluid" src=`+ obj.image + `></div>
        <div class="col m-auto"><p class="text-center"><strong>`+ obj.price + ` €</strong></p></div><div class="col m-auto"><input type="button" class="btn btn-danger" value="Supprimer" id="` + obj.id + `" onClick="del(this.getAttribute('id'));"></div></div>`;



            var totalDiv = document.getElementById('total');
            totalDiv.innerHTML = `<p>Prix total : <strong>` + total + ` €</strong></p>`

            cnt++;
        }
        } catch (error) {
            console.log(error);
        }
    }
}



