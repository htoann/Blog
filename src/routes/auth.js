const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');
router.use(express.urlencoded({ extended: true }));

router.use(express.urlencoded({ extended: true }));
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/logout", authController.getLogout);

module.exports = router;