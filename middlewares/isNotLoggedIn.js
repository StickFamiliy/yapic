function isNotLoggedIn(req, res, next) {
	if (req.session.currentUser) {
		res.redirect('/home/:userId');
	} else {
		next();
	}
}

module.exports = isNotLoggedIn;