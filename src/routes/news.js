const express = require("express");
const router = express.Router();

const newsController = require("../app/controllers/NewsController");

router.patch("/:id/restore", newsController.restore);
router.delete("/:id", newsController.delete);
router.put("/:id", newsController.update);
router.get("/create", newsController.create);
router.post("/store", newsController.store);
router.get("/:id/edit", newsController.edit);
router.get("/:slug", newsController.detail);
router.get("/", newsController.index);

module.exports = router;
