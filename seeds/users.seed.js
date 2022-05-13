const mongoose = require("mongoose");
require("../db");
const User = require("../models/User.model");

const users = [
  {
    username: "pdellacassa",
    password: "123456",
    email: "pdellacassa@gmail.com",
    age: 34,
    genre: "Male",
    country: "Uruguay",
    interest: ["Football", "Hiking", "Rugby"],
    userPhotoUrl:
      "https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg",
  },
  {
    username: "avieites",
    password: "123456",
    email: "albertevieites@gmail.com",
    age: 40,
    genre: "Male",
    country: "Spain",
    interest: ["Photography", "Football", "Web surfing", "Architecture"],
    userPhotoUrl:
      "https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg",
  },
  {
    username: "mrstick",
    password: "123456",
    email: "mrstick@gmail.com",
    age: 100,
    genre: "Non-binary",
    country: "Antigua &amp; Barbuda",
    interest: ["Hiking", "Pottery", "Web surfing", "Architecture"],
    userPhotoUrl: "https://i.ibb.co/6b2xDd5/main.jpg",
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
