var request = new XMLHttpRequest();
request.onreadystatechange = function() {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    for (let i of response) {
      const newElement = document.createElement('div');
      let element = document.getElementById('teddy-card');
      element.appendChild(newElement);
      newElement.classList.add("col-12", "col-lg-4", "mt-5");
      newElement.innerHTML = '<div class="card shadow-sm"><img src="'+i.imageUrl+'" alt=""><div class="card-body"><h5 class="card-title">'+i.name+'</h5><p class="card-text"><strong>'+i.price+'€</strong></p><p class="card-text">'+i.description+'</p></div></div></div>';
    }
  }
}
request.open("GET", "http://localhost:3000/api/teddies");
request.send();