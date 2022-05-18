const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");

const fileUploader = require("./../config/cloudinary");

const isLoggedin = require("../middlewares/isLoggedIn");
const { populate } = require("../models/User.model");

const enumOptions = [
  "3D printing",
  "Amateur radio",
  "Scrapbook",
  "Acting",
  "Baton twirling",
  "Board games",
  "Book restoration",
  "Cabaret",
  "Calligraphy",
  "Candle making",
  "Computer programming",
  "Coffee roasting",
  "Cooking",
  "Colouring",
  "Cosplaying",
  "Couponing",
  "Creative writing",
  "Crocheting",
  "Cryptography",
  "Dance",
  "Digital arts",
  "Drama",
  "Drawing",
  "Do it yourself",
  "Electronics",
  "Embroidery",
  "Fashion",
  "Flower arranging",
  "Foreign language learning",
  "Gaming",
  "Tabletop games",
  "Role-playing games",
  "Gambling",
  "Genealogy",
  "Glassblowing",
  "Gunsmithing",
  "Homebrewing",
  "Ice skating",
  "Jewelry making",
  "Jigsaw puzzles",
  "Juggling",
  "Knapping",
  "Knitting",
  "Kabaddi",
  "Knife making",
  "Lacemaking",
  "Lapidary",
  "Leather crafting",
  "Lego building",
  "Lockpicking",
  "Machining",
  "Macrame",
  "Metalworking",
  "Magic",
  "Model building",
  "Listening to music",
  "Origami",
  "Painting",
  "Playing musical instruments",
  "Pet",
  "Poi",
  "Pottery",
  "Puzzles",
  "Quilting",
  "Reading",
  "Scrapbooking",
  "Sculpting",
  "Sewing",
  "Singing",
  "Sketching",
  "Soapmaking",
  "Sports",
  "Stand-up comedy",
  "Sudoku",
  "Table tennis",
  "Taxidermy",
  "Video gaming",
  "Watching movies",
  "Web surfing",
  "Whittling",
  "Wood carving",
  "Woodworking",
  "World Building",
  "Writing",
  "Yoga",
  "Yo-yoing",
  "Air sports",
  "Archery",
  "Architecture",
  "Astronomy",
  "Backpacking",
  "Base jumping",
  "Baseball",
  "Basketball",
  "Beekeeping",
  "Bird watching",
  "Blacksmithing",
  "Board sports",
  "Bodybuilding",
  "Brazilian jiu-jitsu",
  "Community",
  "Cycling",
  "Dowsing",
  "Driving",
  "Fishing",
  "Football",
  "Flying",
  "Flying disc",
  "Foraging",
  "Gardening",
  "Geocaching",
  "Ghost hunting",
  "Graffiti",
  "Handball",
  "Hiking",
  "Hooping",
  "Horseback riding",
  "Hunting",
  "Inline skating",
  "Jogging",
  "Kayaking",
  "Kite flying",
  "Kitesurfing",
  "Larping",
  "Letterboxing",
  "Metal detecting",
  "Motor sports",
  "Mountain biking",
  "Mountaineering",
  "Mushroom hunting",
  "Mycology",
  "Netball",
  "Nordic skating",
  "Orienteering",
  "Paintball",
  "Parkour",
  "Photography",
  "Polo",
  "Rafting",
  "Rappelling",
  "Rock climbing",
  "Roller skating",
  "Rugby",
  "Running",
  "Sailing",
  "Sand art",
  "Scouting",
  "Scuba diving",
  "Sculling",
  "Rowing",
  "Shooting",
  "Shopping",
  "Skateboarding",
  "Skiing",
  "Skim Boarding",
  "Skydiving",
  "Slacklining",
  "Snowboarding",
  "Stone skipping",
  "Surfing",
  "Swimming",
  "Taekwondo",
  "Tai chi",
  "Urban exploration",
  "Vacation",
  "Vehicle restoration",
  "Water sports",
];

/* GET index page */
router.get("/", (req, res) => {
  res.render("index");
});

/* GET home page */
router
  .get(
    "/home/:userId",
    isLoggedin,
    fileUploader.single("postPhotoUrl"),
    (req, res) => {
      var myTags = [];
      var myMatches = [];

      User.findById(req.params.userId)
        .populate("posts")
        .then((user) => {
          for (var post of user.posts) {
            for (var tag of post.tags) {
              if (!myTags.includes(tag)) {
                myTags.push(tag);
              }
            }
          }
          return user;
        })
        .then((user) => {
          User.find({ _id: { $ne: req.session.currentUser._id } })
            .then((usersMatch) => {
              usersMatch.forEach((user) => {
                myTags.forEach((tag) => {
                  if (
                    user.interests.includes(tag) &&
                    !myMatches.includes(user)
                  ) {
                    myMatches.push(user);
                  }
                });
              });
              return user;
            })
            .then((user) =>
              res.render("home", {
                user: user,
                myTags: myTags,
                myMatches: myMatches,
              })
            );
        });
    }
  )
  

  router
  .post("/post/delete/:postId", isLoggedin, (req, res) => {
    const currentUser = req.session.currentUser;
    const postId = req.params.postId
    Post.findByIdAndDelete(postId)
      .then(res.redirect(`/home/${currentUser._id}`))
      .catch((err) => console.log(err));
  });

/* GET and POST new post */
router
  .route("/post/new")
  .get((req, res, next) => res.render("post-creation", { enumOptions: enumOptions , user: req.session.currentUser}))
  .post(fileUploader.single("postPhotoUrl"), (req, res) => {
    // Get the user id from the session
    const currentUser = req.session.currentUser;

    // Get the form data from the body
    const { title, description, tags, date } = req.body;
    console.log(req.body);

    // Get the image url from uploading
    const postPhotoUrl = req.file.path;

    console.log(title, description, tags, postPhotoUrl, date);

    Post.create({
      title,
      description,
      tags,
      postPhotoUrl,
      date,
      owner: currentUser._id,
    })
      .then((createdPost) => {
        console.log("Created by ", createdPost);
        User.findByIdAndUpdate(currentUser._id, {
          $push: { posts: createdPost },
        }).then(() => res.redirect(`/home/${currentUser._id}`));
      })
      .catch((error) => {
        console.log(error);
      });
  });

/* GET match profile */
router.route("/match/:matchId").get((req, res, next) => {
  const { matchId } = req.params;
  User.findById(matchId)
    .then((user) => res.render("private/match-profile", user))
    .catch((err) => console.log(err));
});

module.exports = router;
