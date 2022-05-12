const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  postPhotoUrl: {
    type: String,
    default: "https://easterntradelinks.com/front/images/default.png",
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  description: { type: String, required: true, maxlength: 300 },
  tags: [{ type: String }],
  date: {type: Date}
});

const Post = model("Post", postSchema);

module.exports = Post;
