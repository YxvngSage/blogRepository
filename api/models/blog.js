const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    post_image: String,
    added_date: String
});

module.exports = mongoose.model('Blog', blogSchema);