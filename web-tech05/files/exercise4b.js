// exercise4b.js

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

// Testing the constructor by creating a few Image objects
const image1 = new Image(1920, 1080, 24);
image1.print();

const image2 = new Image(1280, 720, 16);
image2.print();

const image3 = new Image(640, 480, 8);
image3.print();