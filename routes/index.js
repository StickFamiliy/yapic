const router = require('express').Router();

const User = require('../models/User.model');
const Post = require('../models/Post.model');

/* GET home page */
router.get('/', (req, res, next) => {
	res.render('index');
});

/*
router.get('/rooms', (req, res) => {
	//Get rooms from DB
	Room.find()
		.populate('owner')
		.then((rooms) => {
			res.render('rooms/all-rooms', { rooms });
		})
		.catch((error) => {
			console.log(error);
		});
});

router.get('/rooms/:id', (req, res) => {
	const { id } = req.params;
	//const roomId = req.params.id
*/

module.exports = router