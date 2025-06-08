const express = require("express");
const Category = require("../models/Category");
const router = express.Router();



router.get('/', async(req,res) => {
    const categories = await Category.find();
    res.json(categories);
});

router.post('/', async(req,res) => {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
});

router.delete('/:id', async (req,res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

module.exports = router ;