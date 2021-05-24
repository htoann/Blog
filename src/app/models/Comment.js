const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema(
  {
    slug: { type: String, slug: "title", unique: true },
    content: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", comment, "comment");
