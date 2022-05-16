const mongoose = require("mongoose");
const User = require("../models/User.model");
require("../db/index");


const users = [
  {
    username: "pdellacassa",
    password: "$2b$10$/QkTIByd/EusAVkh42LaWu25QZoOSyovZ.piNoASJu4KGQ6t3vlRm",
    email: "pdellacassa@gmail.com",
    age: 34,
    genre: "Male",
    country: "Uruguay",
    interests: ["Football", "Hiking", "Rugby"],
    userPhotoUrl: undefined
  },
  {
    username: "avieites",
    password: "$2b$10$/QkTIByd/EusAVkh42LaWu25QZoOSyovZ.piNoASJu4KGQ6t3vlRm",
    email: "albertevieites@gmail.com",
    age: 40,
    genre: "Male",
    country: "Spain",
    interests: ["Photography", "Football", "Web surfing", "Architecture"],
    userPhotoUrl: undefined
  },
  {
    username: "mrstick",
    password: "$2b$10$/QkTIByd/EusAVkh42LaWu25QZoOSyovZ.piNoASJu4KGQ6t3vlRm",
    email: "mrstick@gmail.com",
    age: 100,
    genre: "Non-binary/non-conforming",
    country: "Antigua & Barbuda",
    interests: ["Hiking", "Pottery", "Web surfing", "Architecture"],
    userPhotoUrl: undefined
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
