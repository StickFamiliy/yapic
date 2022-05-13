const express = require('express');
const router = require('express').Router();

const User = require('../models/User.model');
const Post = require('../models/Post.model');

const fileUploader = require('./../config/cloudinary')

/* GET index page */
router.get('/', (req, res, next) => {
	res.render('index');
});

/* GET home page */
router
	.route('/home/:userId')
 	.get((req, res, next) => {Post.find()
		.populate('owner')
		.then((posts) => {
			res.render('home', { posts });
		})
		.catch((error) => {
			console.log(error);
		});
	})





/* POST new photo */
router
	.route("/post/new")
	.get((req, res, next) => res.render("post-creation"))
	.post(fileUploader.single('postPhotoUrl'), (req, res) => {
		// Get the user id from the session
		const currentUser = req.session.currentUser;

		// Get the form data from the body
		const { title, description, tags } = req.body;

		// Get the image url from uploading
		const postPhotoUrl = req.file.path;

		console.log(title, description, tags, postPhotoUrl);

		Post.create({
			title,
			description,
			tags,
			postPhotoUrl,
			owner: currentUser._id
		})
			.then((createdPost) => {
				console.log('THIS A POST THAT I CREATED: ',createdPost);
				res.redirect(`/home/${currentUser._id}`);
			})
			.catch((error) => {
				console.log(error);
			})
	})

	/* MATCH PROFILE */
/* 	router
		.route("/match/:matchId");
		.get((req, res, next) => {
			res.render("/match")
		}) */
	
		

module.exports = router;