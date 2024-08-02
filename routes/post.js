const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../models/post");

router.post(
  "/posts",
  [
    auth,
    [
      (check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty()),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid Inputs" });
    }

    try {
      const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.user.id,
      });

      await post.save();

      res.json({
        id: post.id,
        title: post.title,
        description: post.description,
        createdAt: post.createdAt,
      });
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/posts/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      authro: req.user.id,
    });

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    await Post.deleteOne({ _id: req.params.id });

    res.status(204).json({ message: "Post deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
