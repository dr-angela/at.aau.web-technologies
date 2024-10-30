document.querySelector('#button').addEventListener('click',function (event){
    console.log("inner:");
    console.log("target: "+event.target);
    console.log("currentTarget: "+event.currentTarget);
    console.log("thist: "+this);
});

document.querySelector('#outerArea').addEventListener('click',function (event){
        console.log("outer:");
        console.log("target: " + event.target);
        console.log("currentTarget: " + event.currentTarget);
        console.log("thist: " + this);
});