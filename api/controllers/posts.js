const Post = require("../models/Post");

const posts = async (req, res, next) => {
  try {
    console.log(req.body);
    const { post, username, price } = req.body;
    const newPost = new Post({
      content: post,
      username: username,
      price: price,
    });
    await newPost.save();

    res.status(200).send({ res: "Post has been created." });
  } catch (err) {
    next(err);
  }
};

const getmypost = async (req, res, next) => {
  try {
    console.log("Username:", req.params.username);
    const user = req.params.username;
    const posts = await Post.find({ username: user });
    console.log(posts);
    res
      .status(200)
      .send({ status: true, res: "Got the user post", posts: posts });
    return posts;
  } catch (err) {
    next(err);
  }
};

const getallpost = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    console.log(posts);
    res.status(200).send({ status: true, res: "Got all post", posts: posts });
  } catch (err) {
    next(err);
  }
};

const editpost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const content = req.body.content;
    const price = req.body.price;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { content, price },
      { new: true }
    );
    console.log("Updated sucessfully");
    if (!updatedPost) {
      return res.status(404).send({ status: false, error: "Post not found" });
    }
    res.status(200).send({
      status: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (err) {
    next(err);
  }
};

const deletepost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await Post.deleteOne({ _id: id });
    if (!del) {
      return res.status(404).send({ status: false, error: "Post not deleted" });
    }
    return res
      .status(200)
      .send({ status: true, message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const searchpost = async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const posts = await Post.find({
      content: { $regex: searchTerm, $options: "i" },
    });
    res.json({ success: true, posts });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  posts,
  getmypost,
  getallpost,
  editpost,
  deletepost,
  searchpost,
};
