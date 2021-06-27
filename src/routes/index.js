var authRouter = require("./auth");
var meRouter = require("./me");
var blogRouter = require("./Blog");
var siteRouter = require("./site");
var aboutRouter = require("./about");
var commentRouter = require("./comment.js");
require("dotenv").config();
const nodemailer = require("nodemailer");

function route(app) {
  app.use("/auth", authRouter);

  app.use("/me", meRouter);

  app.use("/blog", blogRouter);

  app.use("/comment", commentRouter);

  app.use("/about", aboutRouter);

  app.use("/mail", (req, res) => {
    const output = `
      <p>Hi ${req.body.name},</p>
      <p>Chào mừng bạn đến với blog! Mọi thông tin mới nhất về blog sẽ được gửi tới bạn thông qua địa chỉ email này.</p>
      <p>My Contact: </p>
      <p>Email: huutrantoan@gmail.com</p>
      <br>
      <p>Trần Hữu Toàn</p>
      <p style="color: gray">Blog HToan</p>
      `;
    let sendMail = function () {
      let mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailDetails = {
        from: "bloghtoan@gmail.com",
        to: req.body.mail,
        subject: "Thank You For Subscribing To My Blog",
        text: "Node.js testing mail",
        html: output,
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs");
        } else {
          console.log("Email sent successfully");
        }
      });
    };
    res.redirect("/blog");
    sendMail();
  });

  app.use("/", siteRouter);

  app.use((req, res) => {
    res.status(404).render("home");
  });
}

module.exports = route;
