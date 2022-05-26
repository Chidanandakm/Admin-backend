const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    featured_image: {
        type: String,
        default: null
    },
    media: [String],
    excerpt: String,
    slug: {
        type: String,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'private', 'trashed'],
        default: 'draft',
    },
    meta_keywords: String,
    meta_description: String,


}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);


// function myPlugin(schema) {
//     for (const index of schema.indexes()) {
//       if (index[1].unique === undefined) {
//         index[1].unique = true;
//       }
//     }
//   }