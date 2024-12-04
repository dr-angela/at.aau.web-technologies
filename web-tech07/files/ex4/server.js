let express = require('express');
let cors = require('cors')
const app = express();

app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *

// the database pool, see EX3
const pool = require('./pool.js');

// this is necessary to implement session-based authentication 
const session = require('express-session');
// this is necessary to allow session data to be stored in the PostgreSQL database
const pgSession = require('connect-pg-simple')(session);

// EX3: this is necessary to allow parsing request bodies which contain json 
// it is also necessary to set the proper content type (application/json) in the request (e.g. in postman or RESTer)
let bodyParser = require('body-parser');
app.use(bodyParser.json());

// this is necessary to provide authentication to access the routes
const checkAuth = require('./check_auth');

app.use(session({
    resave: false,  // let it be like this
    saveUninitialized: false,  // let it be like this

    // TODO: initialize further session parameters here 
    store: new pgSession({
        pool: pool,
        tableName: 'user_sessions',
        createTableIfMissing: true
    }),
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    secret: "secret"

}));

// the express router inherits the properties of the application
// including the session, so this has to be defined after the session is added to the app object
const loginRoutes = require('./login');
app.use("/login", loginRoutes);

// default route, no principal changes from EX3
app.get("/", (req, res) => {
    res.status(200).send("EX4: This is a database-backed application which uses JWT");
});

// TODO: copy the /products and /product route handlers from EX3 here
// TODO: and add the authentication callback from check_auth.js to their definitions

app.get('/products', checkAuth, (req, res) => {
    pool
        .query('SELECT * FROM products')
        .then((result) => res.send(result.rows))
        .catch((e) => {
            console.log(e)
            res.status(400).send(e);
        })

});

// TODO: write your route handler here to get a single product from the DB pool	
app.get('/product/:id', checkAuth, (req, res) => {
    const pid = req.params.id
    pool.query(`SELECT * FROM products WHERE id = '${pid}'`)
        .then(result => {
            res.send(result.rows)
        })
        .catch(e => res.status(400).send(e))
})






// TODO: implement the logout handler here
app.get('/logout', (req, res) => {
    req.session.destroy()
    if (req.session == undefined) {
        res.status(200).send()
    } else {
        res.status(500)
    }
})

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
