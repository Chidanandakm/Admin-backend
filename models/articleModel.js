const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    desc: String,
    author: String,
    media: [String],
    slug: {
        type: String,
        unique: true
    },
    categories: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],


})

module.exports = mongoose.model('Article', articleSchema);
