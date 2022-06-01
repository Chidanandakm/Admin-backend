const express = require("express");
const router = express.Router();

const { createArticle, getArticles, getArticle, updateArticle, deleteArticle, commentOnArticle, updateComment, deleteComment } = require("../controllers/articleController");
const { protectedRoute } = require("../middleware/authMiddleware");

router.get('/', getArticles);

router.get('/:id', getArticle);

router.post('/create', protectedRoute, createArticle);

router.put('/:id', protectedRoute, updateArticle);

router.delete('/:id', protectedRoute, deleteArticle);



//id used here id comment.id on article
router.post('/comment/:id', protectedRoute, commentOnArticle);
router.patch('/updateComment/:id', protectedRoute, updateComment);
router.delete('/deleteComment/:id', protectedRoute, deleteComment);


module.exports = router;
