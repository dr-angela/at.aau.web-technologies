// exercise4.js

// Part 4a: Create an object for an image with JSON syntax
const image = {
    width: 1920, // pixels
    height: 1080, // pixels
    bitdepth: 24, // Number of bits used to store color information per pixel

    // Function to compute the raw size and number of pixels
    computeSize: function() {
        // Calculate the total number of pixels
        this.pixels = this.width * this.height;
        
        // Calculate the raw size in bytes (divide by 8 to convert bits to bytes)
        this.rawsize = (this.pixels * this.bitdepth) / 8;
    }
};

// Call the computeSize function to calculate rawsize and pixels
image.computeSize();

// Print the values of pixels and rawsize to the console
console.log("Pixels:", image.pixels); // Expected output: Pixels: 2073600
console.log("Raw Size (bytes):", image.rawsize); // Expected output: Raw Size (bytes): 6220800