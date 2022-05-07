const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'basic',
            enum: ['basic', 'admin', 'editor'],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
