const express = require("express");
const router = express.Router();

const commentController = require("../app/controllers/CommentController");

router.post("/:slug", commentController.postComment);

module.exports = router;
