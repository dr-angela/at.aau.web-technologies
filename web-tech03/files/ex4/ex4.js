// Event listener for the button
document.querySelector('#button').addEventListener('click',function (event){
    console.log("inner:");
    console.log("target: "+event.target);
    console.log("currentTarget: "+event.currentTarget);
    console.log("thist: "+this);
});
// Event listener for the outer div
document.querySelector('#outerArea').addEventListener('click',function (event){
    // Only log information if the cklick originated from the button 
    if (event.target.id === 'button') {
        console.log("outer:");
        console.log("target: " + event.target);
        console.log("currentTarget: " + event.currentTarget);
        console.log("thist: " + this);
    }
});