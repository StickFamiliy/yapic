const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");

const fileUploader = require("./../config/cloudinary");

const isLoggedin = require("../middlewares/isLoggedIn");

/* GET index page */
router.get("/", (req, res) => {
  res.render("index");
});

/* GET home page */
/*router.route("/home/:userId").get((req, res, next) => {
  Post.find()
    .populate("owner")
    .populate("title")
    .populate("description")
    .populate("tags")
    .populate("date")
    .then((posts) => {
      res.render("home", { posts });
    })
    .catch((error) => {
      console.log(error);
    });
});*/

router.get("/home/:userId", fileUploader.single("postPhotoUrl"),(req, res) => {
    //Get the user id from the session
    const userId = req.session.currentUser._id;

    //Get the form data from the body
    const { owner, title, description, tags, date } = req.body;

    //Get the image url from uploading
    let postPhotoUrl = undefined;
    if (req.file) postPhotoUrl = req.file.path;

    console.log(owner, title, description, tags, date, postPhotoUrl);

    Post.findByIdAndUpdate(userId, {
      owner,
      title,
      description,
      tags,
      date,
      postPhotoUrl,
    })
      .then((showPosts) => {
        console.log(showPosts);
        res.render("home", { showPosts });
      })
      .catch((error) => {
        console.log(error);
      });
  }
);













/* POST new post */
router
  .route("/post/new")
  .get((req, res, next) => res.render("post-creation"))
  .post(fileUploader.single("postPhotoUrl"), (req, res) => {
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
      owner: currentUser._id,
    })
      .then((createdPost) => {
        console.log("Created by ", createdPost);
        res.redirect(`/home/${currentUser._id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  });

/* MATCH PROFILE */
/* 	router
		.route("/match/:matchId");
		.get((req, res, next) => {
			res.render("/match")
		}) */

module.exports = router;
