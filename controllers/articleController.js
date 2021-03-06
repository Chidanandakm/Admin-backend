const mongoose = require("mongoose");
const Article = require("../models/articleModel");
const Comment = require("../models/commentsModel");

const createArticle = async (req, res) => {
   const {
      title,
      content,
      category,
      author,
      featured_image,
      media,
      excerpt,
      status,
      meta_keywords,
      meta_description,
      slug,
   } = req.body;

   try {
      const article = await Article.create({
         title,
         content,
         author,
         category,
         featured_image,
         media,
         excerpt,
         status,
         meta_keywords,
         meta_description,
         slug: !slug ? title.replace(/\s/g, "-").toLowerCase() : slug,
      });
      res.status(201).json(article);
   } catch (error) {
      res.status(500).json({ error });
   }
};

const getArticles = async (req, res) => {
   const { category } = req.query;
   const { title } = req.query;
   try {
      let articles;
      if (category) {
         articles = await Article.find({ category });
      } else if (title) {
         articles = await Article.find({ title: { $regex: title, $options: "i" } });
      } else {
         articles = await Article.find();
      }
      res.status(200).json(articles);
   } catch (error) {
      res.status(500).json(error);
   }
};

const getArticle = async (req, res) => {
   const { id } = req.params;
   try {
      const article = await Article.findById(id).populate({ path: 'comments', populate: { path: 'user' } });
      res.status(200).json({ article });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

const updateArticle = async (req, res) => {
   try {
      if (req.body.slug) {
         req.body.slug = req.body.slug.replace(/\s/g, "-").toLowerCase();
      }
      const updatedArticle = await Article.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).populate(
         "category"
      );
      res.status(200).json({ updatedArticle });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const deleteArticle = async (req, res) => {
   const { id } = req.params;
   try {
      const deletedArticle = await Article.findByIdAndDelete(id);
      res.status(200).json({ deletedArticle, message: "Article deleted successfully" });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const commentOnArticle = async (req, res) => {
   const { id } = req.params;
   const { text } = req.body;
   const user = req.user;
   try {
      const comment = await Comment.create({
         text,
         user,
         article: id,
      });
      const article = await Article.findByIdAndUpdate(id, { $push: { comments: comment._id } }, { new: true });
      res.status(201).json({ comment, article });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const updateComment = async (req, res) => {
   const { id } = req.params;
   const { text } = req.body;
   try {
      const comment = await Comment.findByIdAndUpdate(id, { $set: { text } }, { new: true });
      const article = await Article.findByIdAndUpdate(comment.article, { $set: { comments: comment._id } }, { new: true });
      res.status(201).json({ comment, article });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const deleteComment = async (req, res) => {
   const { id } = req.params;
   try {
      const comment = await Comment.findByIdAndDelete(id);
      const article = await Article.findByIdAndUpdate(comment.article, { $pull: { comments: comment._id } }, { new: true });
      res.status(201).json({ comment, article });
   } catch (error) {
      res.status(500).json({ error });
   }
};
//get comments of perticular article with article id
const getComments = async (req, res) => {
   const { id } = req.params;
   console.log(id);
   try {
      const articles = await Article.findById(id).populate({ path: 'comments', populate: { path: 'user' } });
      const commentsArray = articles.comments;
      res.status(200).json(commentsArray);
   } catch (error) {
      res.status(500).json(error.message);
   }
};

module.exports = {
   createArticle,
   getArticles,
   getArticle,
   updateArticle,
   deleteArticle,
   commentOnArticle,
   updateComment,
   deleteComment,
   getComments,
};
