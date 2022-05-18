const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js");
const fileUploader = require("../config/cloudinary");

const isLoggedin = require("../middlewares/isLoggedIn");

const enumOptions = [
  '3D printing',
  'Amateur radio',
  'Scrapbook',
  'Acting',
  'Baton twirling',
  'Board games',
  'Book restoration',
  'Cabaret',
  'Calligraphy',
  'Candle making',
  'Computer programming',
  'Coffee roasting',
  'Cooking',
  'Colouring',
  'Cosplaying',
  'Couponing',
  'Creative writing',
  'Crocheting',
  'Cryptography',
  'Dance',
  'Digital arts',
  'Drama',
  'Drawing',
  'Do it yourself',
  'Electronics',
  'Embroidery',
  'Fashion',
  'Flower arranging',
  'Foreign language learning',
  'Gaming',
  'Tabletop games',
  'Role-playing games',
  'Gambling',
  'Genealogy',
  'Glassblowing',
  'Gunsmithing',
  'Homebrewing',
  'Ice skating',
  'Jewelry making',
  'Jigsaw puzzles',
  'Juggling',
  'Knapping',
  'Knitting',
  'Kabaddi',
  'Knife making',
  'Lacemaking',
  'Lapidary',
  'Leather crafting',
  'Lego building',
  'Lockpicking',
  'Machining',
  'Macrame',
  'Metalworking',
  'Magic',
  'Model building',
  'Listening to music',
  'Origami',
  'Painting',
  'Playing musical instruments',
  'Pet',
  'Poi',
  'Pottery',
  'Puzzles',
  'Quilting',
  'Reading',
  'Scrapbooking',
  'Sculpting',
  'Sewing',
  'Singing',
  'Sketching',
  'Soapmaking',
  'Sports',
  'Stand-up comedy',
  'Sudoku',
  'Table tennis',
  'Taxidermy',
  'Video gaming',
  'Watching movies',
  'Web surfing',
  'Whittling',
  'Wood carving',
  'Woodworking',
  'World Building',
  'Writing',
  'Yoga',
  'Yo-yoing',
  'Air sports',
  'Archery',
  'Architecture',
  'Astronomy',
  'Backpacking',
  'Base jumping',
  'Baseball',
  'Basketball',
  'Beekeeping',
  'Bird watching',
  'Blacksmithing',
  'Board sports',
  'Bodybuilding',
  'Brazilian jiu-jitsu',
  'Community',
  'Cycling',
  'Dowsing',
  'Driving',
  'Fishing',
  'Football',
  'Flying',
  'Flying disc',
  'Foraging',
  'Gardening',
  'Geocaching',
  'Ghost hunting',
  'Graffiti',
  'Handball',
  'Hiking',
  'Hooping',
  'Horseback riding',
  'Hunting',
  'Inline skating',
  'Jogging',
  'Kayaking',
  'Kite flying',
  'Kitesurfing',
  'Larping',
  'Letterboxing',
  'Metal detecting',
  'Motor sports',
  'Mountain biking',
  'Mountaineering',
  'Mushroom hunting',
  'Mycology',
  'Netball',
  'Nordic skating',
  'Orienteering',
  'Paintball',
  'Parkour',
  'Photography',
  'Polo',
  'Rafting',
  'Rappelling',
  'Rock climbing',
  'Roller skating',
  'Rugby',
  'Running',
  'Sailing',
  'Sand art',
  'Scouting',
  'Scuba diving',
  'Sculling',
  'Rowing',
  'Shooting',
  'Shopping',
  'Skateboarding',
  'Skiing',
  'Skim Boarding',
  'Skydiving',
  'Slacklining',
  'Snowboarding',
  'Stone skipping',
  'Surfing',
  'Swimming',
  'Taekwondo',
  'Tai chi',
  'Urban exploration',
  'Vacation',
  'Vehicle restoration',
  'Water sports'
]

router.get("/profile/:id", isLoggedin, (req, res) => {
  const id = req.params.id;
  res.render("private/profile", { user: req.session.currentUser, enumOptions })
});

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

  User.findByIdAndUpdate(userId, {
    username,
    password,
    email,
    age,
    genre,
    country,
    interests,
    userPhotoUrl,
  }, {new: true})
    .then((editUser) => {
      req.session.currentUser = editUser
      console.log(editUser);
      res.redirect(`/profile/${userId}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

