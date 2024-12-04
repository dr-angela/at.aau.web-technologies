let cfg = require('./config.json')
const jwt = require('jsonwebtoken');

// EX4 TODO:
// - verify token using jwt_key of "secret"
// - set req.userData to the user information stored in the token's payload
module.exports = (req, res, next) => {
    return res.status(401).json({message: "Authentication failed"}); // TODO: replace with your code
};
