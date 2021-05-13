const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");

router.get("/stored/posts", meController.getStored);
router.get("/trash/posts", meController.getTrash);

module.exports = router;
