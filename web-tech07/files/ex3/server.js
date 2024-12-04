// take the connection pool capabilities from the pg module
const { Pool } = require('pg');

let express = require('express');
let cors = require('cors')
const app = express();
app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *

const pool = require('./pool')


// EX3: this is necessary to allow parsing request bodies which contain json 
// it is also necessary to set the proper content type (application/json) in the request (e.g. in postman or RESTer)
let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("EX3: This is a simple database-backed application");

});


// TODO: write your code here to get the list of products from the DB pool	
app.get('/products', (req, res) => {
    pool
        .query('SELECT * FROM products')
        .then((result) => res.send(result.rows))
        .catch((e) => {
            console.log(e)
            res.status(400).send(e);
        })



});

// TODO: write your route handler here to get a single product from the DB pool	
app.get('/product/:id', (req, res) => {
    const pid = req.params.id
    pool.query(`SELECT * FROM products WHERE id = '${pid}'`)
        .then(result => {
            res.send(result.rows)
        })
        .catch(e => res.status(400).send(e))
})

// TODO: write your code here to update the description of the given product
app.put("/product/:ID", (req, res) => {
    const id = req.params.ID;
    const payload = req.body;
    const txt = "UPDATE products SET description = $2 WHERE id = $1";
    const values = [id, payload.description];
    pool
        .query(txt, values)
        .then((result) => {
            if (result.rowCount === 0) {
                res.status(400).send("No such Product");
            } else {
                res.contentType("json");
                res.send(result.rows);
            }
        })
        .catch((e) => res.status(400).send(e));
});

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
