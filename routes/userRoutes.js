const express = require("express");
const router = express.Router();

const { requestPasswordRecovery, resetPassword, requestPassword, resetYourPassword } = require("../controllers/resetPassword");
const { Register, Login, getUsers, getUser, Updateuser, deleteUser } = require("../controllers/userController");
const { protectedRoute } = require("../middleware/authMiddleware");


router.get("/", protectedRoute, getUsers);
router.get("/:id", getUser);

router.post("/register", Register);

router.post("/login", Login);

router.patch("/:id", protectedRoute, Updateuser);
router.delete("/:id", protectedRoute, deleteUser);

router.post('/request-reset-password', requestPasswordRecovery);
router.post('/reset-password/:token', resetPassword);

router.post('/request-reset-password-web', requestPassword);
router.post('/reset-password-web/:token', resetYourPassword);

module.exports = router;
