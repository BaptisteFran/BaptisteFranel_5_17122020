clicked = localStorage.getItem('clicked');
elt = document.getElementById('article');
var nbPanier = localStorage.getItem('panier');


if (clicked = true && clicked != null) {
    teddyName = localStorage.getItem('name');
    teddyImage = localStorage.getItem('imageUrl');
    teddyPrice = localStorage.getItem('price');

    if (nbPanier != null) {
        nbPanier = parseInt(nbPanier);
    } else {
        nbPanier = 0;
    }
    nbPanier++;
    localStorage.setItem('panier', nbPanier);


    var teddyName = { 'name': teddyName, 'image': teddyImage, 'price': teddyPrice };

    localStorage.setItem(nbPanier, JSON.stringify(teddyName));

    cnt = 0;
    total = 0;

    while (cnt != nbPanier) {
        var retrievedObject = localStorage.getItem(cnt + 1);
        var obj = JSON.parse(retrievedObject);

        total += parseInt(obj.price);

        const newElement = document.createElement('div');
        elt.appendChild(newElement);
        newElement.innerHTML = `<div class="row m-5 border shadow-sm"><div class="col m-auto"><p><strong>` + obj.name + `
    </strong></p></div><div class="col m-auto">
    <img  class="img-fluid" src=`+ obj.image + `></div>
    <div class="col m-auto"><p><strong>`+ obj.price + `</strong></p></div><div class="col m-auto"><button type="button" class="btn btn-danger" id="supprimer">Supprimer</button></div></div>`;

        var totalDiv = document.getElementById('total');
        totalDiv.innerHTML = `<p>Prix total : <strong>` + total + ` €</strong></p>`


        cnt++;
    }



    localStorage.removeItem('name');
    localStorage.removeItem('imageUrl');
    localStorage.removeItem('price');
    localStorage.removeItem('clicked');


} else {
    if (nbPanier == 0 || nbPanier === null) {
        elt.innerHTML = `<div class="row"><div class="col" m-auto"><p class="alert alert-danger role="alert">Votre panier est vide</p></div></div>`;
    } else {
        cnt = 0;
        total = 0;

        while (cnt != nbPanier) {
            var retrievedObject = localStorage.getItem(cnt + 1);
            var obj = JSON.parse(retrievedObject);
            total += parseInt(obj.price);
            console.log(obj);

            const newElement = document.createElement('div');
            elt.appendChild(newElement);
            newElement.innerHTML = `<div class="row m-5 border shadow-sm"><div class="col m-auto"><p><strong>` + obj.name + `
        </strong></p></div><div class="col m-auto">
        <img  class="img-fluid" src=`+ obj.image + `></div>
        <div class="col m-auto"><p><strong>`+ obj.price + `</strong></p></div><div class="col m-auto"><button type="button" class="btn btn-danger" id="supprimer">Supprimer</button></div></div>`;



            var totalDiv = document.getElementById('total');
            totalDiv.innerHTML = `<p>Prix total : <strong>` + total + ` €</strong></p>`

            cnt++;
        }
    }
}



