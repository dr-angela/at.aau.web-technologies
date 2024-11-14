'use strict';

// Array to store products from the HTML
let products = [];

// Function to update the cart display
function updateCart() {
	let output = document.getElementById("orderedItems"); // Element to display cart items
	output.innerHTML = ""; // Clear previous items in the display
	let total = 0; // Variable to store the total price of items in the cart

	// Loop over each product to update cart display
	for (let p of products) {
		if (p.numInCart > 0) { // Only display if the product is in the cart
			let newP = document.createElement("li"); // Create list item for the product
			newP.appendChild(document.createTextNode(p.title + " " + p.price + " (" + p.numInCart + ")"));
			output.appendChild(newP); // Add the product item to the cart display
			total += p.numInCart * p.price; // Add to the total price
		}
	}
	document.getElementById("totalPrice").innerHTML = total.toFixed(2); // Display total price
}

// Loop through each product section in the HTML
for (let pdiv of document.querySelectorAll("div.product")) {
	let cp = {}; // Object to store product details
	
	// Extract product data from HTML
	cp.id = pdiv.dataset.prodid; // Product ID
	cp.title = pdiv.firstChild.nextSibling.firstChild.nodeValue; // Product title
	cp.desc = pdiv.getElementsByClassName('desc')[0].innerText; // Product description
	cp.price = parseFloat(pdiv.getElementsByClassName('price')[0].innerText.replace(",", ".")); // Convert price to number
	cp.numInCart = 0; // Initial quantity in cart
	cp.domElement = pdiv; // Save the product's HTML element
	products.push(cp); // Add product to the products array

	// Function to handle "add to cart" button clicks
	function addListener(e) {
		console.log("Added to cart:", cp.title); // Log the product being added
		cp.numInCart += 1; // Increase quantity in cart
		updateCart(); // Refresh cart display
	}

	// Set event listener for the "add to cart" button
	let clickButton = pdiv.getElementsByClassName('buy')[0];
	clickButton.addEventListener('click', addListener);
}

// Add event listener for the "Empty Shopping Cart" button
let emptyCartButton = document.getElementById("emptyCard");
if (emptyCartButton) {
	emptyCartButton.addEventListener('click', () => {
		console.log("Empty Cart button clicked");
		products.forEach(product => product.numInCart = 0); // Reset quantity of each product in the cart to 0
		updateCart(); // Update cart display to show empty cart
	});
} else {
	console.log("Empty Cart button not found");
}