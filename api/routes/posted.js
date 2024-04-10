const express = require("express");
const {
  posts,
  getmypost,
  getallpost,
  editpost,
  deletepost,
  searchpost
} = require("../controllers/posts.js");

const router = express.Router();

router.post("/posts", posts);
router.get("/getmypost/:username", getmypost);
router.get("/getallpost", getallpost);
router.post("/editpost/:postId", editpost);
router.get("/deletepost/:id", deletepost);
router.get("/search",searchpost)

module.exports = router;
