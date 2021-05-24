const express = require("express");
const router = express.Router();

const blogController = require("../app/controllers/BlogController");

router.patch("/:id/restore", blogController.patchRestore);
router.delete("/:id", blogController.deleteDelete);
router.delete("/:id/force", blogController.deleteForce);
router.put("/:id", blogController.putUpdate);
router.get("/create", blogController.getCreate);
router.post("/create", blogController.postCreate);
router.get("/:id/edit", blogController.getEdit);
router.get("/:slug", blogController.getDetail);
router.get("/", blogController.index);

module.exports = router;
