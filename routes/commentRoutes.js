const express = require("express");
const router = express.Router();
const comments = require("../data/comments");
const usersfile = require("../data/users");
//get data
router.get("/", (req, res) => {
  res.json(comments);
});
router.post("/", (req, res) => {
  if (req.body.comment && req.body.postId && req.body.userId) {
    const commentExists = comments.find(
      (com) => com.comment == req.body.comment
    );
    if (commentExists) {
      res.json({ error: "Comment Already used" });
    }
    const comment = {
      id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1,
      comment: req.body.comment,
      postId: req.body.id,
      userId: req.body.userId,
    };
    comments.push(comment);
    res.status(201).json(comment);
  } else {
    res.json({ error: "Insufficient Data" });
  }
});
//export module
module.exports = router;
