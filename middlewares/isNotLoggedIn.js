function isNotLoggedIn(req, res, next) {
	if (req.session.currentUser) {
		res.redirect(`/home/${req.session.currentUser._id}`);
	} else {
		next();
	}
}

module.exports = isNotLoggedIn;