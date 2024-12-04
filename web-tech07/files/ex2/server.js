let express = require('express');
const app = express();
let fs = require('fs');
let cors = require('cors');
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
app.use(express.static('public')); // host public folder

// TODO: read the products.json file here into a string
const products = fs.readFileSync('products.json')
const productsJSON = JSON.parse(products)
console.log(products.toString())

app.get('/', function (req, res) {

	// 1 - TODO: set a content type (from ex.1)

	res.contentType('text/html')

	res.status(200).send("<h1>EX2: This is a simple application</h1>");
});


app.get('/products', function (req, res) {

	// 2 - write your code here to output the list of products as JSON

	// extract the products IDs with .map() method, that creates an array of IDs
	const productIds = productsJSON.map(product => product.id);
	
	// set content-type to inform client that response is JSON
	res.contentType('appliaction/json');

	// send the IDs as a JSON object
	res.send({ productIds })

});

// 4
// write your route handler to output a single product by its ID as JSON here


app.get('/product/:id', (req, res) => {
	const pid = req.params.id	// extract the ID from the URL 
	let p = undefined
	productsJSON.forEach(product => {
		if (product.id === pid) {
			p = product
		}
	});
	if (p === undefined) {
		res.status(400).send()
	} else {
		res.send(p)
	}


})


let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
