'use strict';

let products = [];

function updateCart() {
	let output = document.getElementById("orderedItems");
	output.innerHTML= "";
	let total = 0;
	for (let p of products) {
		if (p.numInCart >0) { 
			let newP = document.createElement ("li");
			newP.appendChild(document.createTextNode (p.render()));
			output.appendChild(newP);
			total += p.numInCart*p.price;
		}
	}
	document.getElementById("totalPrice").innerHTML = total.toFixed(2);
}

function Product(el) {
	this.id = el.dataset.prodid;
	this.title =  el.firstChild.nextSibling.firstChild.nodeValue;
	this.desc = el.getElementsByClassName('desc')[0].innerText;
	this.price = parseFloat(el.getElementsByClassName('price')[0].innerText);
	this.numInCart = 0;
	
	this.updateProduct = function (e) {
		this.numInCart +=1;
		updateCart();
	}
	
	this.render = function () {
		return this.title+" "+this.price+"("+this.numInCart +")";
		
	}
	
	let clikButton = el.getElementsByClassName('buy')[0];
	clikButton.addEventListener('click', this.updateProduct);
}

for (let pdiv of document.querySelectorAll("div.product")) {
	products.push(new Product(pdiv));
}

