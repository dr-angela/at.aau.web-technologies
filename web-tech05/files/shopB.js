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
			total += p.numInCart * p.price; // Calculate the running total price
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
	
	// Method to update the cart when this product is added
	this.updateProduct = () => { // Arrow function to keep `this` bound to the Product instance
		this.numInCart += 1; // Increment the quantity of this product in the cart
		updateCart(); // Refresh the cart display with the updated quantity and total
	}
	
	// Method to render the product details for the cart display
	this.render = function () {
		return `${this.title} ${this.price} (${this.numInCart})`; // Format: Title Price (Quantity)
	}
	
	// Set up the event listener for the "add to cart" button
	let clickButton = el.querySelector('.buy input[type="button"]'); // Target the button inside the .buy div
	if (clickButton) {
		clickButton.addEventListener('click', this.updateProduct); // Bind `updateProduct` directly
	}
}

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
		products.forEach(product => product.numInCart = 0);
		updateCart(); // Update cart display to show an empty cart
	});
} else {
	console.log("Empty Cart button not found");
}