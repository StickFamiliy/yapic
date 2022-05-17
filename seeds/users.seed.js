const mongoose = require("mongoose");
const User = require("../models/User.model");
require("../db/index");

const users = [
  {
    username: "brazilianAleix",
    password: "",
    email: "baleix@yapic.com",
    age: 23,
    genre: "Male",
    country: "Brazil",
    interests: ["Magic"],
    userPhotoUrl: undefined,
  },
];

User.deleteMany().then(() => {
  User.create(users)
    .then((usersFromDb) => {
      console.log("Created", usersFromDb.length, "users");
      mongoose.connection.close();
    })
    .catch((err) =>
      console.log(`An error occurred while creating users: ${err}`)
    );
});
