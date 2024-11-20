// Constructor for task objects.
// Receives a label and a reference to a dom element for the event log.
function task(taskLabel,evlog) {
	this.label = taskLabel;
	this.evlog = evlog;
	this.startButton = document.getElementById('start'+taskLabel);
	this.cancelButton = document.getElementById('cancel'+taskLabel);
	this.endButton = document.getElementById('end'+taskLabel);
	this.counter = 0;
	
	// Explain the code below
	this.startButton.addEventListener('click',
		()=> { runTaskPromise(this).then(
				() => {endTask(this)}
			).catch( 
				() => {cancelTask(this)}
			)
		}); 
		
	this.endButton.disabled = true;
	this.cancelButton.disabled = true;
}

function runTaskPromise(task) {
	task.evlog.innerHTML += '<pre>'+task.label+' started\t'+new Date() +'\n</pre>';
	task.startButton.disabled = true;
	task.endButton.disabled = false;
	task.cancelButton.disabled = false;
	
	// Add your code here
	// Create a new promise that is fulfilled, when End task is clicked and rejected if Cancel is clicked.
	// return the promise.
}



function endTask(task) {
	task.endButton.disabled = true;
	task.cancelButton.disabled = true;
	task.startButton.disabled = false;
	task.evlog.innerHTML += '<pre>'+task.label+' ended\t\t'+new Date() +'\n</pre>';
}

function cancelTask(task) {
	task.endButton.disabled = true;
	task.cancelButton.disabled = true;
	task.startButton.disabled = false;
	task.evlog.innerHTML += '<pre>'+task.label+' cancelled\t'+new Date() +'\n</pre>';
}


var evlog = document.getElementById('eventLog');
var taskA = new task('A',evlog);
var taskB = new task('B',evlog);