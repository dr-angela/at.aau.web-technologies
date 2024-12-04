let cfg = require('./config.json')

let express = require('express');
let cors = require('cors')
const app = express();
app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *

const pool = require('./pool.js');

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

const checkAuth = require('./check_auth');

const loginRoutes = require('./login');
app.use("/login", loginRoutes);

// get products for logged in user as a list of JSON entries
app.get("/", (req, res) => {
    
	// TODO: set content type (from EX1)
	
    res.status(200).send("EX4: This is a database-backed application which uses JWT");
});

// TODO: the rest of the route handlers are mostly the same as in EX3 with important differences

  
let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);
