const mongoose = require("mongoose");
const Article = require("../models/articleModel");
const Comment = require("../models/commentsModel");

// create article
const createArticle = async (req, res) => {
    const { title, desc, categories } = req.body;

    try {
        const result = await Article.create({
            categories,
            title,
            desc,
            slug: title.replace(/\s/g, "-").toLowerCase(),
        });
        res.status(201).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
};


//get all articles
const getArticles = async (req, res) => {
    try {

        const articles = await Article.find().populate("comments");
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json(error);
    }
};


//get single article
const getArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findById(id).populate("comments");
        res.status(200).json({ article });
    } catch (error) {
        res.status(500).json({ error });
    }
};


//update article
const updateArticle = async (req, res) => {
    try {
        if (req.body.slug) {
            req.body.slug = req.body.slug.replace(/\s/g, "-").toLowerCase();
        }
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({ updatedArticle });
    } catch (error) {
        res.status(500).json({ error });
    }
};


//delete article
const deleteArticle = async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        res
            .status(200)
            .json({ deletedArticle, message: "Article deleted successfully" });
    } catch (error) {
        res.status(500).json({ error });
    }
};


//comment on article
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
        const article = await Article.findByIdAndUpdate(
            id,
            { $push: { comments: comment._id } },
            { new: true }
        );
        res.status(201).json({ comment, article });
    } catch (error) {
        res.status(500).json({ error });
    }
};

//update comment on article
const updateComment = async (req, res) => {

    // const { comments } = await Article.findById(req.params.id);
    const { id } = req.params;
    // console.log(comments);
    const { text } = req.body;
    const user = req.user;
    try {
        // if()
        const comment = await Comment.findByIdAndUpdate(
            id,
            { $set: { text } },
            { new: true }
        );
        const article = await Article.findByIdAndUpdate(
            comment.article,
            { $set: { comments: comment._id } },
            { new: true }
        );
        res.status(201).json({ comment, article });
    } catch (error) {
        res.status(500).json({ error });
    }

}

const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(id);
        const article = await Article.findByIdAndUpdate(
            comment.article,
            { $pull: { comments: comment._id } },
            { new: true }
        );
        res.status(201).json({ comment, article });
    } catch (error) {
        res.status(500).json({ error });
    }
}


module.exports = {
    createArticle,
    getArticles,
    getArticle,
    updateArticle,
    deleteArticle,
    commentOnArticle,
    updateComment,
    deleteComment
};

