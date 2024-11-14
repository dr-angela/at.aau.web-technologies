'use strict';

let products = [];

function updateCart() {
	let output = document.getElementById("orderedItems");
	output.innerHTML= "";
	let total = 0;
	for (let p of products) {
		if (p.numInCart >0) { 
			let newP = document.createElement ("li");
			newP.appendChild(document.createTextNode (p.title+" "+p.price+"("+p.numInCart +")"));
			output.appendChild(newP);
			total += p.numInCart*p.price;
		}
	}
	document.getElementById("totalPrice").innerHTML = total.toFixed(2);
}

for (let pdiv of document.querySelectorAll("div.product")) {
	let cp = {};
	// Parsing Data from HTML
	cp.id = pdiv.dataset.prodid;
	cp.title = pdiv.firstChild.nextSibling.firstChild.nodeValue;
	cp.desc = pdiv.getElementsByClassName('desc')[0].innerText;
	cp.price = parseFloat(pdiv.getElementsByClassName('price')[0].innerText);
	cp.numInCart = 0;
	cp.domElement = pdiv;
	products.push(cp);
	
	function addListener(e) {
		console.log(e);
		cp.numInCart +=1;
		updateCart();
	}
		
	//set Event Listener
	let clikButton = pdiv.getElementsByClassName('buy')[0];
	clikButton.addEventListener('click', addListener);
}


