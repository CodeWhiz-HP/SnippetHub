const express = require("express");
const Category = require("../models/Category");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth");



router.get('/',AuthMiddleware, async(req,res) => {
    const categories = await Category.find({ userId: req.user.id });
    res.json(categories);
});

router.post('/',AuthMiddleware, async(req,res) => {
    const category = new Category({...req.body, userId: req.user.id });
    await category.save();
    res.status(201).json(category);
});

router.delete('/:id',AuthMiddleware, async (req,res) => {
    const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  if (category.userId.toString() !== req.user.id) {
    return res.status(403).json({ error: "You are not allowed to delete this category" });
  }
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

module.exports = router ;