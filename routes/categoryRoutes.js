const express = require("express");
const router = express.Router();

const { createCategory, updateCategory, getCategories, deleteCategory, getCategory } = require("../controllers/categoryController");
const { protectedRoute } = require("../middleware/authMiddleware");

router.get("/", protectedRoute, getCategories);

router.get('/:id', protectedRoute, getCategory);

router.post('/create', protectedRoute, createCategory);

router.put('/:id', protectedRoute, updateCategory);

router.delete('/:id', protectedRoute, deleteCategory);

module.exports = router;