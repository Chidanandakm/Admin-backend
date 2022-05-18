const express = require("express");
const router = express.Router();

const { Register, Login, getUsers, getUser, Updateuser, deleteUser } = require("../controllers/userController");
const { protectedRoute } = require("../middleware/authMiddleware");


router.get("/", getUsers);
router.get("/:id", getUser);

router.post("/register", Register);

router.post("/login", Login);

router.patch("/:id", protectedRoute, Updateuser);
router.delete("/:id", protectedRoute, deleteUser);

module.exports = router;
