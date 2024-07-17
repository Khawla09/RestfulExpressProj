const express = require("express");
const router = express.Router();
const posts = require("../data/posts");
//get data
router.get("/", (req, res) => {
  res.json(posts);
});
//export file
module.exports = router;
