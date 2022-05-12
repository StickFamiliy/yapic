const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  genre: { type: String },

  country: { type: String },

  interests: [{ type: String }],

  userPhotoUrl: {
    type: String,
    default:
      "https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg",
  }
});

const User = model("User", userSchema);

module.exports = User;
