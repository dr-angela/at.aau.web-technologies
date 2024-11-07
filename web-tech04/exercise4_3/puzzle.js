document.addEventListener("DOMContentLoaded", () => {
    const puzzleTarget = document.getElementById("puzzleTarget");
    const puzzleSource = document.getElementById("puzzleSource");
    const puzzleCells = document.querySelectorAll(".puzzlePic");
    const puzzlePieces = puzzleSource.querySelectorAll("img");

    puzzlePieces.forEach(piece => {
        piece.draggable = true;

        piece.addEventListener("dragstart", event => {
            event.dataTransfer.setData("text/plain", piece.src);
        });
    });

    puzzleCells.forEach(cell => {
        cell.addEventListener("dragover", event => {
            event.preventDefault();
        });

        cell.addEventListener("drop", event => {
            event.preventDefault();
            const imageSrc = event.dataTransfer.getData("text/plain");

            if (cell.style.backgroundImage) {
                // Move existing image back to the source area
                const existingImage = new Image();
                existingImage.src = cell.style.backgroundImage.slice(5, -2); // Remove url() wrapper
                puzzleSource.appendChild(existingImage);
            }

            cell.style.backgroundImage = `url(${imageSrc})`;

            // Check if all images are in the correct positions
            checkPuzzleCompletion();
        });
    });

    function checkPuzzleCompletion() {
        let allCorrect = true;

        puzzleCells.forEach(cell => {
            const correctImage = cell.getAttribute("data-result");
            const currentImage = cell.style.backgroundImage.slice(5, -2); // Extract image name from url()

            // If the cell is empty or has the wrong image, mark allCorrect as false
            if (!currentImage || currentImage !== correctImage) {
                allCorrect = false;
            }
        });

        // Show messages based on the correctness of all cells
        if (allCorrect) {
            alert("Congratulations! You solved the puzzle!");
        }
    }
});