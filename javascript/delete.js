nbPanier = localStorage.getItem('panier');
console.log('nbpanier avant :', nbPanier)

function del(idTest) {
    nbPanier--;
    console.log(idTest);
    //localStorage.removeItem(idTest);
    //localStorage.setItem('panier', nbPanier);
}