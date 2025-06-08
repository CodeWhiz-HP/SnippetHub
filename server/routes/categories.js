const express = require("express");
const Category = require("../models/Category");
const router = express.Router();
const AuthMiddleware = require("../routes/auth");



router.get('/',AuthMiddleware, async(req,res) => {
    const categories = await Category.find();
    res.json(categories);
});

router.post('/',AuthMiddleware, async(req,res) => {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
});

router.delete('/:id',AuthMiddleware, async (req,res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

module.exports = router ;