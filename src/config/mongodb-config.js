const mongoose = require("mongoose");
const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const session = require("express-session");

let mongodbURI = process.env.MONGODBURI;
if (process.env.MONGODB_URL) {
  mongodbURI = process.env.MONGODB_URL;
}

mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    let port = process.env.PORT;
    if (port == null || port == "") {
      port = 3000;
    }
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  session({
    secret: "verysecret",
    resave: true,
    saveUninitialized: false,
    store: new MongoDBStore({
      uri: process.env.MONGODBURI,
      collection: "sessions",
      connectionOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
  })
);
