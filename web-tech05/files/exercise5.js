// exercise5.js

// Defining the Image class with a constructor and methods
class Image {
    constructor(width, height, bitdepth) {
        this.width = width;
        this.height = height;
        this.bitdepth = bitdepth;

        // Calculate pixels and rawsize(directly in the constructor)
        this.pixels = this.width * this.height;
        this.rawsize = (this.pixels * this.bitdepth) / 8;
    }

    // Method to display properties
    print() {
        console.log("Image Properties:");
        console.log("Width:", this.width);
        console.log("Height:", this.height);
        console.log("Bit Depth:", this.bitdepth);
        console.log("Pixels:", this.pixels);
        console.log("Raw Size (bytes):", this.rawsize);
    }

    // Method to display properties with orientation
    printMore() {
        this.print();
        const orientation = this.width > this.height ? "Landscape" : "Portrait";
        console.log("Orientation:", orientation);
    }
}

// Define the Video class that extends Image
class Video extends Image {
    constructor(width, height, bitdepth, duration, framerate) {
        // Call the parent constructor
        super(width, height, bitdepth);
        
        // Additional properties for Video
        this.duration = duration;
        this.framerate = framerate;
    }

    // Method to calculate total frames
    totalFrames() {
        return this.duration * this.framerate;
    }

    // Override print() to include video specific properties
    print() {
        console.log("\n--- Video Properties ---");
        super.print(); // Call the print method from Image
        console.log("Duration (seconds):", this.duration);
        console.log("Framerate (fps):", this.framerate);
        console.log("Total Frames:", this.totalFrames());
    }
}

// Testing

const image1 = new Image(1920, 1080, 24);
image1.printMore();

const video1 = new Video(1920, 1080, 24, 120, 30);
video1.print(); // Should display properties of Image and Video
video1.printMore(); // Should display properties plus orientation