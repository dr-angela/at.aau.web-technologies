let cfg = require('./config.json')
const express = require('express');
const router = express.Router();

const pool = require('./pool.js');

const jwt = require('jsonwebtoken');

// login route creating/returning a token on successful login
router.post('/', (req, res) => {

    // TODO: get login parameters from request body

    // prepare DB query

    // issue query (returns promise)
    pool.query(query)
        .then (results => {

			// handle no match (login failed)

            // everything is ok
            resultUser = resultRows[0];
            
			const token = /* form the token with userData (accessible when decoding token), jwtkey, expiry time */;
            
			res.status(200).json({
                "message": "login successful",
                login: resultUser.login,
                token: token
            });

        })
        .catch(error => {
            // handle error accessing db
        });

});

module.exports = router;
