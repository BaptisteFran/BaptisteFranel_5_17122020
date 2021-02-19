nbPanier = localStorage.getItem('panier');
console.log('nbpanier avant :', nbPanier)

function del(id) {
    nbPanier--;
    console.log(id);
    let deleteTeddy = localStorage.getItem(id);
    console.log(deleteTeddy)
    alert('Delete teddy' + ' ' + id);
    localStorage.removeItem(id);
    localStorage.setItem('panier', nbPanier);
}