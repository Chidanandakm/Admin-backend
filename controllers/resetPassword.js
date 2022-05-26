const mongoose = require("mongoose");


const resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exist" });
        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });
        const url = `http://localhost:3000/reset/${token}`;
        const mailOptions = {
            from: " " + process.env.EMAIL,
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
        res.status(200).json({ message: "Email sent" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

