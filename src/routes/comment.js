const express = require("express");
const router = express.Router();

const commentController = require("../app/controllers/CommentController");
router.use(express.urlencoded({ extended: true }));

router.post("/:slug", commentController.postComment);

module.exports = router;
