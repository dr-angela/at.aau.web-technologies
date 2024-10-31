// Function to calculate price based on width, height, and thickness
function calculate(width, height, thickness) {
    let price; // block-scoped
    const colorInput = document.getElementById("color").value; // block-scoped

    // Check if the glass color is grey (R, G, B values are the same)
    const r = parseInt(colorInput.substr(1, 2), 16); // block-scoped
    const g = parseInt(colorInput.substr(3, 2), 16); // block-scoped
    const b = parseInt(colorInput.substr(5, 2), 16); // block-scoped
    const isGrey = (r === g && g === b);

    // Determine the price based on color (shade of grey or not)
    if (isGrey) {
        price = (width * height * thickness) / 100;
    } else {
        price = (width * height * thickness) / 64;
    }

    return price.toFixed(2); // Format to 2 decimal places
}

// function update: checks if all input fields are valid and, if so, calculates the price and updates the form.
function update() {
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    const thicknessInput = document.querySelector('input[name="thickness"]:checked');
    const priceField = document.getElementById("price");

    // Check if all required inputs have valid values
    if (width && height && thicknessInput && document.getElementById("color").checkValidity()) {
        const thickness = parseFloat(thicknessInput.value); // thickness into number
        const price = calculate(width, height, thickness); // call of calculate function
        priceField.value = `${price} €`; // update price field
    } else {
        priceField.value = "-"; // Show hyphen if values are invalid or incomplete
    }
}

// Attach event listeners to trigger update() whenever values change
document.getElementById("width").addEventListener("input", update);
document.getElementById("height").addEventListener("input", update);
document.getElementById("color").addEventListener("input", update);

// 'forEach' loop adds a 'change' event listener to each radio button in the thickness group
// This triggers update() whenever the selected thickness changes
document.querySelectorAll('input[name="thickness"]').forEach(radio => {
    radio.addEventListener("change", update);
});