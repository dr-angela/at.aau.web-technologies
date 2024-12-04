const express = require('express');
const router = express.Router();

const pool = require('./pool.js');
const { Session } = require('express-session');

// login route creating/returning a session on successful login
// note that the path here is "/" as "/login" is defined for the whole module, so no further path is necessary
// this route will be still called on http://localhost:3000/login
router.post('/', (req, res) => {

    // TODO: get login parameters from request body
    const user = req.body.auth.user
    const password = req.body.auth.pass
    // prepare DB query
    const query = {
        txt: `Select * from users where login = $1 and password = $2`,
        values: [user, password]
    }
    // issue query (returns promise)
    pool.query(query.txt, query.values)
        .then(results => {
            // TODO: handle no match (login failed)
            if (results.rowCount == 0) {
                res.status(401).json({
                    "message": "authentication_failed",

                });
            }
            // handle the case if everything is ok
            if (results.rowCount == 1) {

                const resultUser = results.rows[0]



                // TODO: create the session here
                req.session.isAuth = true
                req.session.userName = resultUser.login

                res.status(200).json({
                    "message": "login successful",
                    login: resultUser.login
                });
            }

        })
        .catch(error => {
            // handle the errors accessing the database
            console.log(error)
            res.status(500).json({
                "message": "database error",
            });
        });

});

module.exports = router;
