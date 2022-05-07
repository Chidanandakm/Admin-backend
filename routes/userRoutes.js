const express = require("express");
const router = express.Router();

const { Register, Login, getUsers } = require("../controllers/userController");
const { protectedRoute } = require("../middleware/authMiddleware");

router.get("/", protectedRoute, getUsers);
router.post("/register", Register);
router.post("/login", Login);

module.exports = router;
