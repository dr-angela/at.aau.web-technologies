// exercise4c.js

// Constructor function to create Image objects
function Image(width, height, bitdepth) {
    // Set properties from parameters
    this.width = width;
    this.height = height;
    this.bitdepth = bitdepth;
    
    // Calculate pixels and rawsize directly in the constructor
    this.pixels = this.width * this.height; // Total number of pixels
    this.rawsize = (this.pixels * this.bitdepth) / 8; // Total size in bytes

    // Define the print() method to display all properties, excluding functions
    this.print = function() {
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== "function") {
                console.log(`${key}: ${this[key]}`);
            }
        }
    };
}

// Extend the Image prototype with printMore method for Exercise 4c
Image.prototype.printMore = function() {
    // Directly print properties to avoid recursion with print
    for (let key in this) {
        if (this.hasOwnProperty(key) && typeof this[key] !== "function") {
            console.log(`${key}: ${this[key]}`);
        }
    }
    
    // Determine if the image is portrait or landscape
    const orientation = (this.width > this.height) ? "Landscape" : "Portrait";
    console.log("Orientation:", orientation);
};

// Testing the constructor by creating a few Image objects
const image1 = new Image(1920, 1080, 24);
image1.printMore(); // Should print all properties plus "Orientation: Landscape"

const image2 = new Image(1280, 720, 16);
image2.printMore(); // Should print all properties plus "Orientation: Landscape"

const image3 = new Image(640, 480, 8);
image3.printMore(); // Should print all properties plus "Orientation: Landscape"

// Exercise 4d) Testing reassignment

// Call the original print function
console.log("Original print:");
image1.print();

// Reassign print to refer to printMore
image1.print = image1.printMore;

// Now calling print() will actually call printMore()
console.log("\nAfter reassignment, print refers to printMore:");
image1.print();

