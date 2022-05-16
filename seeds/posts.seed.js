const mongoose = require("mongoose");
require("../db");
const Post = require("../models/Post.model");

const posts = [
  {
    postPhotoUrl: undefined,
    title: "Camp Nou",
    description: "Home of FC Barcelona",
    tags: ["Football"],
    date: undefined,
  },
  {
    postPhotoUrl: undefined,
    title: "Sagrada Familia",
    description: "Minor basilica in the Eixample district of Barcelona",
    tags: ["Architecture", "Urban exploration"],
    date: undefined,
  },
  {
    postPhotoUrl: undefined,
    title: "Tibidabo",
    description: "Sagrat Cor church in Tibidabo's hill",
    tags: ["Architecture"],
    date: undefined,
  },
];

Post.deleteMany().then(() => {
  Post.create(posts)
    .then((postsFromDb) => {
      console.log("Created", postsFromDb.length, "posts");
      mongoose.connection.close();
    })
    .catch((err) =>
      console.log(`An error occurred while creating posts: ${err}`)
    );
});
