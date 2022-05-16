const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js");
const fileUploader = require("../config/cloudinary");

const isLoggedin = require("../middlewares/isLoggedIn");

router.get("/profile", isLoggedin, (req, res) => 
  res.render("private/profile", { user: req.session.currentUser })
);

router.post("/profile", fileUploader.single("userPhotoUrl"), (req, res) => {
  //Get the user id from the session
  const userId = req.session.currentUser._id;

  //Get the form data from the body
  const { username, password, email, age, genre, country, interests } = req.body;

  //Get the image url from uploading
  let userPhotoUrl = undefined
  if(req.file) userPhotoUrl = req.file.path 

  console.log(
    username,
    password,
    email,
    age,
    genre,
    country,
    interests,
    userPhotoUrl
  );

  User.findByIdAndUpdate((userId), {
    username,
    password,
    email,
    age,
    genre,
    country,
    interests,
    userPhotoUrl,
  })
    .then((editUser) => {
      console.log(editUser);
      res.redirect(`/home/${userId._id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

