const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    featured_image: String,
}, { timestamps: true });

module.exports = mongoose.model("Categories", categorySchema);