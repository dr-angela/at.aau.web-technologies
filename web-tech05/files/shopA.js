'use strict';

let products = []; // creates an empty list to hold information about the products

function updateCart() { // function to update the cart display whenever a product is added
	let output = document.getElementById("orderedItems"); // gets the element where cart items will be displayed
	output.innerHTML = ""; // clears any previous items in the cart display
	let total = 0; // variable to store the total price of items in the cart
	
	for (let p of products) { // loops through each product in the products array
		if (p.numInCart > 0) { // checks if the product has been added to the cart
			let newP = document.createElement("li"); // creates a new list item element for this product
			// adds text to the list item showing product title, price, and quantity in cart
			newP.appendChild(document.createTextNode(p.title + " " + p.price + " (" + p.numInCart + ")"));
			output.appendChild(newP); // adds this list item to the orderedItems element
			total += p.numInCart * p.price; // adds the product's total price to the cart's total
		}
	}
	
	// displays the total price of all items in the cart, rounded to two decimal places
	document.getElementById("totalPrice").innerHTML = total.toFixed(2);
}

// loops over each product section in the HTML, setting up data and adding event listeners
for (let pdiv of document.querySelectorAll("div.product")) {
	let cp = {}; // creates an object to hold data about this specific product
	
	// Parsing Data from HTML
	cp.id = pdiv.dataset.prodid; // gets the product ID from the data-prodId attribute in HTML
	cp.title = pdiv.firstChild.nextSibling.firstChild.nodeValue; // gets the product title from the HTML structure
	cp.desc = pdiv.getElementsByClassName('desc')[0].innerText; // gets the product description
	cp.price = parseFloat(pdiv.getElementsByClassName('price')[0].innerText); // converts the product price to a number
	cp.numInCart = 0; // initializes the number of items in the cart for this product to 0
	cp.domElement = pdiv; // saves the product's HTML element for potential use later
	products.push(cp); // adds this product object to the products array
	
	// Anonymous function version 1: Standard anonymous function
	let clickButton = pdiv.getElementsByClassName('buy')[0];
	clickButton.addEventListener('click', function (e) { // directly setting an anonymous function as the event listener
		console.log(e);
		cp.numInCart += 1; // increments the number of this product in the cart
		updateCart(); // calls updateCart to refresh the cart display
	});
	
	// Anonymous function version 2: Arrow function
	// Uncomment this section if you prefer to use the arrow function
	// clickButton.addEventListener('click', (e) => { // directly setting an arrow function as the event listener
	// 	console.log(e);
	// 	cp.numInCart += 1; // increments the number of this product in the cart
	// 	updateCart(); // calls updateCart to refresh the cart display
	// });
}