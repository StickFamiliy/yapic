function isLoggedIn(req, res, next) {
	if (req.session.currentUser) {
		next();
	} else {
		res.redirect('/signup');
	}
}

module.exports = isLoggedIn;
