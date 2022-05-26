const mongoose = require("mongoose");
const Categories = require("../models/categoryModel");

const createCategory = async (req, res) => {
    const { name, featured_image } = req.body;
    try {
        const result = await Categories.create({ name, featured_image, });
        res.status(201).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
};


const getCategories = async (req, res) => {
    try {
        const allCategories = await Categories.find();
        res.status(200).json({ allCategories });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Categories.findById(id);
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ error });
    }
}



const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Categories.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json({ updatedCategory });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Categories.findByIdAndDelete(req.params.id);
        res.status(200).json({ deletedCategory });
    } catch (error) {
        res.status(500).json({ error });
    }
}


module.exports = { createCategory, getCategories, getCategory, updateCategory, deleteCategory }