

const eventLog = document.getElementById('eventLog');

function delayedCalc(a,b) {
	const promise = new Promise(
		(resolve, reject) => {
			if (a > b) {
				setTimeout( 
					() => {
						let c = a+b;
						eventLog.innerHTML += a+" + "+b+" = "+c+"<br>";						
						resolve(c)
					}, 
					Math.floor(Math.random() * 2000));
			}
			else {
				reject('error: b larger than a');
				eventLog.innerHTML += "rejected<br>";						
			}
		});
	return promise;
}


// Change the code below to correctly use promises for an dealayed incremental computation 
// of 5+3+7+14+23+25+1000+1 

delayedCalc(5,3);
delayedCalc(7,14);
delayedCalc(23,25);
delayedCalc(1000,1);


function handleError(error) {
	alert(error);
}



