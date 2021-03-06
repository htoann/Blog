const mongoose = require("mongoose");

const connectDatabase = () => {
  const mongodbURI = process.env.MONGO;
  mongoose.Promise = global.Promise;

  mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDatabase;