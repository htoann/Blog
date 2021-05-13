const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.get("/profile", siteController.profile);
router.get("/", siteController.home);

module.exports = router;
