var nodemailer = require("nodemailer");

let sendMail = function () {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bloghtoan@gmail.com",
      pass: "bloghtoan2002",
    },
  });

  let mailOptions = {
    from: "bloghtoan@gmail.com",
    to: "jungleoffice02@gmail.com",
    subject: "Nodemailer Project",
    text: "Hi from your nodemailer project",
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};

module.exports = {
  sendMail,
};
