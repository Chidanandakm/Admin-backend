const express = require("express");
const router = express.Router();

const { Register, Login, getUsers, Updateuser, deleteUser } = require("../controllers/userController");
const { protectedRoute } = require("../middleware/authMiddleware");

router.get("/", protectedRoute, getUsers);
router.post("/register", Register);
router.post("/login", Login);

router.post("/:id", protectedRoute, Updateuser);
router.delete("/:id", protectedRoute, deleteUser);

module.exports = router;
