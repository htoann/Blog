const express = require("express");
const router = express.Router();

const aboutController = require("../app/controllers/AboutController");

router.get("/", aboutController.getAbout);

module.exports = router;
