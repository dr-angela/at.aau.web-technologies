module.exports = (req, res, next) => {

	// verify if the session exists, if yes, call the next middleware function
	// if no, use the code below
	if (req.session.isAuth) {
		next()
	} else {
		return res.status(401).json({ message: "Authentication failed" });
	}


};
