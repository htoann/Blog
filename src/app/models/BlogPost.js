const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const { format } = require("morgan");

const BlogPost = new Schema(
  {
    title: { type: String, default: "New Post", required: true },
    author: { type: String, default: "Anonymous" },
    img: String,
    content: String,
    categories: String,
    description: String,
    slug: { type: String, slug: "title", unique: true },
  },
  { timestamp: true }
);

// Add plugins
mongoose.plugin(slug);
BlogPost.plugin(
  mongooseDelete,
  { overrideMethods: "all" },
  { deletedAt: true }
);

module.exports = mongoose.model("BlogPost", BlogPost, "posts");
