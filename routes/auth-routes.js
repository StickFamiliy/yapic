//1 import packages and User model
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT || 10;

const User = require('./../models/User.model');

const isNotLoggedIn = require('../middlewares/isNotLoggedIn')

//2 - Create 5 routes: 2 for login, 2 for signup and 1 for logout
router.get('/signup', isNotLoggedIn, (req, res) => {
	res.render('/signup');
});

router.post('/signup', isNotLoggedIn, (req, res) => {
	
	//GET VALUES FROM FORM
	const { username, email, password } = req.body;

	//VALIDATE INPUT
	if (
		!username ||
		username === '' ||
		!password ||
		password === '' ||
		!email ||
		email === '' ||
		!email.includes('@')
	) {
		res.render('/signup', { errorMessage: 'Something went wrong, try again.' });
	}

	//Check if user already exists
	User.findOne({ username: username })
		.then((user) => {
			
			//If user exists, send error
			if (user) {
				res.render('/signup', { errorMessage: 'This user already exists. Please create a new one.' });
				return;
			
			} else {
			
				//Hash the password
				const salt = bcrypt.genSaltSync(saltRounds);
				const hash = bcrypt.hashSync(password, salt);

				//If user does not exist, create it
				User.create({ username, email, password: hash })
					.then((newUser) => {

						console.log(newUser);
						//Once created, redirect
						res.redirect('/login');
					})
					.catch((err) => console.log(err));
			}
		})
		.catch((err) => console.log(err));
});

router.get('/login', isNotLoggedIn, (req, res) => {
	res.render('/login');
});

router.post('/login', isNotLoggedIn, (req, res) => {
	//GET VALUES FROM FORM
	const { username, email, password } = req.body;

	//VALIDATE INPUT
	if (
		!username ||
		username === '' ||
		!password ||
		password === '' ||
		!email ||
		email === '' ||
		!email.includes('@')
	) {
		res.render('/signup', { errorMessage: 'Something went wrong, try again.' });
	}

	User.findOne({ username })
		.then((user) => {
			if (!user) {
				res.render('/login', { errorMessage: 'Input invalid. Please try again.' });
			} else {
				
				const encryptedPassword = user.password;
				const passwordCorrect = bcrypt.compareSync(password, encryptedPassword);

				if (passwordCorrect) {
					req.session.currentUser = user;
					res.redirect(`/home/${user._id}`);
				} else {
					res.render('/login', { errorMessage: 'Input invalid. Please try again.' });
				}
			}
		})
		.catch((err) => console.log(err));
});

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.render('/error', { message: 'Something went wrong!' });
		} else {
			res.redirect('/');
		}
	});
});

module.exports = router;
