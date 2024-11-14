'use strict';

let products = []; // Global array to store all product objects

// Function to update the shopping cart display
function updateCart() {
	let output = document.getElementById("orderedItems"); // Element to display cart items
	output.innerHTML = ""; // Clear the current content of the cart display
	let total = 0; // Variable to hold the total price of items in the cart

	// Loop through each product to add items to the cart display
	for (let p of products) {
		if (p.numInCart > 0) { // Only include products that are in the cart
			let newP = document.createElement("li"); // Create a list item for the product
			newP.appendChild(document.createTextNode(p.render())); // Display product details using the render() method
			output.appendChild(newP); // Add this list item to the cart display
			total += p.getTotalPrice(); // Add the total price of each product to the running total
		}
	}
	// Display the total price in the cart, rounded to 2 decimal places
	document.getElementById("totalPrice").innerHTML = total.toFixed(2);
}

// Constructor function to create product objects
function Product(el) {
	this.id = el.dataset.prodid; // Get the product ID from the HTML data attribute
	this.title = el.querySelector("h2").innerText; // Extract the product title
	this.desc = el.querySelector(".desc").innerText; // Extract the product description
	this.price = parseFloat(el.querySelector(".price").innerText.replace(",", ".")); // Convert price text to a float number
	this.numInCart = 0; // Initialize the number of this product in the cart as 0
	
	// Set up the "add to cart" button
	let addButton = el.querySelector('.buy input[type="button"]');
	if (addButton) {
		addButton.addEventListener('click', () => this.addToCart()); // Arrow function to bind `this`
	}

	// Create and set up the "remove one" button (only enabled when numInCart > 0)
	let removeButton = document.createElement('button');
	removeButton.innerText = "Remove One";
	removeButton.disabled = true; // Initially disabled
	removeButton.addEventListener('click', () => this.removeOneFromCart());
	el.querySelector('.buy').appendChild(removeButton); // Append it next to the add button
	this.removeButton = removeButton; // Store reference to toggle disable state later
}

// Define methods on Product's prototype

// Add an item to the cart
Product.prototype.addToCart = function() {
	this.numInCart += 1; // Increment the quantity
	this.removeButton.disabled = this.numInCart <= 0; // Enable "remove" button if there are items in the cart
	updateCart(); // Update the shopping cart display
};

// Remove one item from the cart
Product.prototype.removeOneFromCart = function() {
	if (this.numInCart > 0) {
		this.numInCart -= 1; // Decrement the quantity
	}
	this.removeButton.disabled = this.numInCart <= 0; // Disable "remove" button if no items left
	updateCart(); // Update the shopping cart display
};

// Calculate the total price for the quantity of this product in the cart
Product.prototype.getTotalPrice = function() {
	return this.numInCart * this.price; // Quantity multiplied by the unit price
};

// Render the product's display text for the shopping cart
Product.prototype.render = function() {
	let postfix = ""; // Default postfix is empty
	if (this.id === "sonyA7V") {
		postfix = " New Arrival!"; // Add "New Arrival!" postfix for Sony A7V
	}
	return `${this.title} ${this.price} (${this.numInCart}) - Total: ${this.getTotalPrice().toFixed(2)}${postfix}`;
};

// Loop through each product section in the HTML to create product objects
for (let pdiv of document.querySelectorAll("div.product")) {
	products.push(new Product(pdiv)); // Create a new Product instance and add it to the products array
}

// Add event listener for the "Empty Shopping Cart" button
let emptyCartButton = document.getElementById("emptyCard");
if (emptyCartButton) {
	emptyCartButton.addEventListener('click', () => {
		console.log("Empty Cart button clicked");
		// Reset the quantity of each product in the cart to 0
		products.forEach(product => {
			product.numInCart = 0;
			product.removeButton.disabled = true; // Disable "remove one" button for each product
		});
		updateCart(); // Update cart display to show an empty cart
	});
} else {
	console.log("Empty Cart button not found");
}