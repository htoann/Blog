const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const BlogPost = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    description: String,

    img: String,
    content: String,
    categories: String,
    slug: { type: String, slug: "title", unique: true },
  },
  { timestamps: true }
);

// Add plugins
mongoose.plugin(slug);
BlogPost.plugin(
  mongooseDelete,
  { overrideMethods: "all" },
  { deletedAt: true }
);

module.exports = mongoose.model("BlogPost", BlogPost, "posts");
