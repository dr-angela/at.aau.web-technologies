// Function to calculate price based on width, height, and thickness
function calculate(width, height, thickness) {
    let price;
    const colorInput = document.getElementById("color").value;

    // Check if the glass color is grey (R, G, B values are the same)
    const r = parseInt(colorInput.substr(1, 2), 16);
    const g = parseInt(colorInput.substr(3, 2), 16);
    const b = parseInt(colorInput.substr(5, 2), 16);
    const isGrey = (r === g && g === b);

    // Determine the price based on color
    if (isGrey) {
        price = (width * height * thickness) / 100;
    } else {
        price = (width * height * thickness) / 64;
    }

    return price.toFixed(2); // Format to 2 decimal places
}

// Function to update the price field in the form
function update() {
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    const thicknessInput = document.querySelector('input[name="thickness"]:checked');
    const priceField = document.getElementById("price");

    // Check if all required inputs have valid values
    if (width && height && thicknessInput && document.getElementById("color").checkValidity()) {
        const thickness = parseFloat(thicknessInput.value);
        const price = calculate(width, height, thickness);
        priceField.value = `${price} €`; // Update price field
    } else {
        priceField.value = "-"; // Show hyphen if values are invalid
    }
}

// Attach event listeners to trigger update() whenever values change
document.getElementById("width").addEventListener("input", update);
document.getElementById("height").addEventListener("input", update);
document.getElementById("color").addEventListener("input", update);
document.querySelectorAll('input[name="thickness"]').forEach(radio => {
    radio.addEventListener("change", update);
});