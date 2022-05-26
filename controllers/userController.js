const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

const secret = "secret";

const getUsers = async (req, res) => {
    const { role } = req.user;
    try {
        // if (role !== "admin") return res.status(401).jso n({ message: "Unauthorized" });
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const Register = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });


    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const Login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) return res.status(400).json({ message: "User does not exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Password is incorrect" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "10h" });

        res.status(200).json({ user: oldUser, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })

    }
};


const Updateuser = async (req, res) => {

    try {
        if (req.params.id === req.user.id || req.user.role === "admin") {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 12);
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json({ updatedUser });
        } else {
            res.status(401).json({ message: "you can update your account only" });
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }



}
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        if (req.params.id === req.user.id || req.user.role === "admin") {
            const deletedUser = await User.findByIdAndDelete(id);
            res.status(200).json(deletedUser);
        } else {
            res.status(401).json({ message: "you can delete your account only" });
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }



}

module.exports = { Register, Login, getUsers, Updateuser, deleteUser, getUser };
