const express = require('express');
const router = express.Router();

const Post = require('../models/Post.model');
const fileUploader = require('../config/cloudinary')

router.get('/profile/:userid', (req, res) => {
	res.render('profile', { user: req.session.currentUser });
});

router.get('/post/new', (req, res) => {
	res.render('home');
});

router.post('/post/new', fileUploader.single('postPhotoUrl'), (req, res) => {
	//Get the user id from the session
	const userId = req.session.currentUser._id;

	//Get the form data from the body
	const { title, description, tags, date } = req.body;

	//Get the image url from uploading
	const imageUrl = req.file.path

	console.log(title, description, imageUrl, tags, date);

	Room.create({
		title,
		description,
		tags,
		date,
		imageUrl,
		owner: userId
	})
		.then((createdPost) => {
			console.log(createdPost);
			res.redirect('/post/new');
		})
		.catch((error) => {
			console.log(error);
		});
});

module.exports = router;
