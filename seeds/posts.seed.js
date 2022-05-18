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
  }
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
