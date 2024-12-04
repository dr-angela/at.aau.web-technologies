// take the connection pool capabilities from the pg module
const { Pool } = require('pg');

let cfg = require('./config.json')

let express = require('express');
let cors = require('cors')
const app = express();
app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *

const pool = require('./pool.js');  // the database pool

// EX3: this is necessary to allow parsing request bodies which contain json 
// it is also necessary to set the proper content type (application/json) in the request (e.g. in postman or RESTer)
let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("EX3: This is a simple database-backed application");
});

// TODO: write your REST handlers here 
	
let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);
