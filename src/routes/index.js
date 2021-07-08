var authRouter = require("./auth");
var meRouter = require("./me");
var blogRouter = require("./Blog");
var siteRouter = require("./site");
var aboutRouter = require("./about");
var commentRouter = require("./comment.js");
var nodemailer = require("nodemailer");

function route(app) {
  app.use("/auth", authRouter);

  app.use("/me", meRouter);

  app.use("/blog", blogRouter);

  app.use("/comment", commentRouter);

  app.use("/about", aboutRouter);

  app.use("/mail", (req, res, err) => {
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
      const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL,
          clientId: process.env.EMAIL_CLIENT_ID,
          clientSecret: process.env.EMAIL_CLIENT_SECRET,
          refreshToken: "",
          accessToken: "",
        },
      });

      mailTransporter.set("oauth2_provision_cb", (user, renew, callback) => {
        let accessToken = userTokens[user];
        if (!accessToken) {
          return callback(new Error("Unknown user"));
        } else {
          return callback(null, accessToken);
        }
      });

      mailTransporter.on("token", (token) => {
        console.log("A new access token was generated");
        console.log("User: %s", token.user);
        console.log("Access Token: %s", token.accessToken);
        console.log("Expires: %s", new Date(token.expires));
      });

      let mailDetails = {
        from: "bloghtoan@gmail.com",
        to: req.body.mail,
        subject: "Thank You For Subscribing To My Blog",
        text: "Node.js Testing Mail",
        html: output,
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent successfully");
        }
      });
    };
    console.log(err);
    res.redirect("/blog");
    sendMail();
  });

  app.use("/", siteRouter);

  app.use((req, res) => {
    res.status(404).render("home");
  });
}

module.exports = route;
