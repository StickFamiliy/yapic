const mongoose = require("mongoose");
require("../db");
const Post = require("../models/Post.model");

const posts = [
  {
    postPhotoUrl: "",
    title: "Camp Nou",
    description: "Home of FC Barcelona",
    tags: ["Football"],
    date: "",
  },
  {
    postPhotoUrl: "",
    title: "Sagrada Familia",
    description: "Minor basilica in the Eixample district of Barcelona",
    tags: ["Architecture", "Urban exploration"],
    date: "",
  },
  {
    postPhotoUrl: "https://easterntradelinks.com/front/images/default.png",
    title: "Tibidabo",
    description: "Sagrat Cor church in Tibidabo's hill",
    tags: ["Architecture"],
    date: "",
  },
];

Post.deleteMany().then(() => {
  Post.create(posts)
    .then((postssFromDb) => {
      console.log("Created", postssFromDb.length, "posts");
      mongoose.connection.close();
    })
    .catch((err) =>
      console.log(`An error occurred while creating posts: ${err}`)
    );
});
