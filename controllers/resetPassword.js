const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcryptjs = require("bcryptjs");
const secret = "secret";
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});


const requestPasswordRecovery = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exist" });

        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });
        const url = `${process.env.ADMIN_URL}/reset-password/${token}`

        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: "Password Reset",
            text: `Click this link to reset your password: ${url}`
        };
        await transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        }
        );
        res.status(200).json({ message: "Check your mail for reset password link" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = jwt.verify(token, secret);

        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).json({ message: "User does not exist" });

        const hashedPassword = await bcryptjs.hash(password, 12);
        const result = await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

        const newToken = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "10h" });
        res.status(200).json({ result, newToken, message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const requestPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exist" });

        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });
        const url = `${process.env.WEBSITE_URL}/reset-password/${token}`

        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: "Password Reset",
            text: `Click this link to reset your password: ${url}`
        };
        await transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        }
        );
        res.status(200).json({ message: "Check your mail for reset password link" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};



module.exports = { requestPasswordRecovery, resetPassword, requestPassword };

