// exercise4e.js

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

// Video constructor function, inheriting from Image
function Video(width, height, bitdepth, duration, framerate) {
    // Call the Image constructor to initialize width, height, and bitdepth
    Image.call(this, width, height, bitdepth);

    // Set additional properties specific to Video
    this.duration = duration; // Duration in seconds
    this.framerate = framerate; // Frames per second
}

// Inherit the prototype of Image so Video instances have access to Image methods
Video.prototype = Object.create(Image.prototype);
Video.prototype.constructor = Video;

// Add totalFrames method to Video prototype
Video.prototype.totalFrames = function() {
    return this.duration * this.framerate; // Calculate total frames
};

// Testing the Video constructor by creating a few Video objects
const video1 = new Video(1920, 1080, 24, 120, 30); // 120 seconds, 30 fps
video1.print(); // Should display properties of video1
console.log("Total Frames:", video1.totalFrames()); // Expected output: 3600

const video2 = new Video(1280, 720, 16, 60, 24); // 60 seconds, 24 fps
video2.print(); // Should display properties of video2
console.log("Total Frames:", video2.totalFrames()); // Expected output: 1440

const video3 = new Video(640, 480, 8, 180, 60); // 180 seconds, 60 fps
video3.print(); // Should display properties of video3
console.log("Total Frames:", video3.totalFrames()); // Expected output: 10800