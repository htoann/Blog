const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const BlogPost = new Schema({
    title: { type: String, default: 'New Post', required: true, },
    author: String,
    img: String,
    content: String,
    categories: String,
    description: String,
    slug: { type: String, slug: 'title', unique: true },
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', BlogPost, "posts");