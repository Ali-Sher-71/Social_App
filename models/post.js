const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

postSchema.pre("save", async function (next) {
  try {
    const user = await mongoose
      .model("User")
      .findByIdAndUpdate(
        this.author,
        { $push: { post: this._id } },
        { new: true }
      );
  } catch (error) {
    console.error(error.message);
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
