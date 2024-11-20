
// Constructor for task objects.
// Receives a label and a reference to a dom element for the event log.
function task(taskLabel,evlog) {
	this.label = taskLabel;
	this.evlog = evlog;
	this.startButton = document.getElementById('start'+taskLabel);
	this.cancelButton = document.getElementById('cancel'+taskLabel);
	this.endButton = document.getElementById('end'+taskLabel);
	this.counter = 0;
	
	// Why is an arrow function required for attaching the event handlers?
	// What happens, when arrow functions are not used? Explain the error message.
	this.startButton.addEventListener('click',
		()=> {runTask(this,
				()=> { endTask(this)},
				()=> { cancelTask(this)}
				)
			});
	this.endButton.disabled = true;
	this.cancelButton.disabled = true;
}

function runTask(task, endCallback, cancelCallback) {
	task.evlog.innerHTML += '<pre>'+task.label+' started\t'+new Date() +'\n</pre>';
	task.startButton.disabled = true;
	task.endButton.disabled = false;
	task.cancelButton.disabled = false;
	
	if (task.counter === 0) {
		task.endListener = task.endButton.addEventListener('click', () => { endCallback(task)})
		task.cancelListener = task.cancelButton.addEventListener('click', () => { cancelCallback(task)})	
	}
	task.counter++;
}

function endTask(task) {
	task.endButton.disabled = true;
	task.cancelButton.disabled = false;
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