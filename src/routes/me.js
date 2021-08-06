const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");

router.get("/stored/blogs", meController.getStored);
router.get("/trash/blogs", meController.getTrash);

module.exports = router;
