document.addEventListener("DOMContentLoaded", () => {
    const puzzleSource = document.getElementById("puzzleSource");
    const puzzleCells = document.querySelectorAll(".puzzlePic");
    const puzzlePieces = puzzleSource.querySelectorAll("img");

    let placedPiecesCount = 0; // Counter for the number of placed images

    // Make each puzzle piece draggable
    puzzlePieces.forEach(piece => {
        piece.draggable = true;

        // Set the image source as data to transfer during drag
        piece.addEventListener("dragstart", event => {
            event.dataTransfer.setData("text/plain", piece.src);
        });
    });

    // Set up each cell in the puzzle target area to allow image drops
    puzzleCells.forEach(cell => {
        // Allow the drop action on the cell
        cell.addEventListener("dragover", event => {
            event.preventDefault();
        });

        // Handle the drop event
        cell.addEventListener("drop", event => {
            event.preventDefault();
            const imageSrc = event.dataTransfer.getData("text/plain");

            if (cell.style.backgroundImage) {
                // Move existing image back to the source area if the cell is occupied
                const existingImage = new Image();
                existingImage.src = cell.style.backgroundImage.slice(5, -2); // Remove url() wrapper
                puzzleSource.appendChild(existingImage);
            } else {
                // Increment the count only if the cell was previously empty
                placedPiecesCount++;
            }

            // Set the dropped image as the background of the cell
            cell.style.backgroundImage = `url(${imageSrc})`;

            // Remove the dragged image from the source area
            const draggedImage = Array.from(puzzleSource.querySelectorAll("img")).find(img => img.src === imageSrc);
            if (draggedImage) {
                puzzleSource.removeChild(draggedImage);
            }

            // Check puzzle completion only after all four images are placed
            if (placedPiecesCount === 4) {
                setTimeout(checkPuzzleCompletion, 1000);
            }
        });
    });

    // Function to check if the puzzle is correctly assembled
    function checkPuzzleCompletion() {
        let allCorrect = true;

        // Verify that each cell has the correct image
        puzzleCells.forEach(cell => {
            const correctImage = cell.getAttribute("data-result");
            const backgroundImage = cell.style.backgroundImage;

            // Extract only the filename from backgroundImage (e.g., "bus-1.jpg")
            const currentImage = backgroundImage.split("/").pop().replace(/['")]+/g, '');

            // If the current image does not match the correct one, mark as incorrect
            if (currentImage !== correctImage) {
                allCorrect = false;
            }
        });

        // Display the appropriate message based on the puzzle completion status
        if (allCorrect) {
            alert("Congratulations! You solved the puzzle!");
        } else {
            alert("One or more pieces are incorrectly placed. Try again!");
        }

        // Reset the counter to allow rechecking if the puzzle is rearranged
        placedPiecesCount = 0;
    }
});