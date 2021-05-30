const express = require("express");
const router = express.Router();

const mailController = require("../app/controllers/MailController");

router.post("/mail", (req, res) => {
  // mailController.sendMail();
  res.redirect("/");
});

module.exports = router;
