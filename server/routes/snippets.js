const express = require("express");
const Snippet = require("../models/Snippet");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth");



router.get('/',AuthMiddleware, async(req,res) => {
    const snippets = await Snippet.find({ userId: req.user.id });
    res.json(snippets);
});

router.post('/',AuthMiddleware, async(req,res) => {
    const snippet = new Snippet({...req.body, userId: req.user.id });
    await snippet.save();
    res.status(201).json(snippet);
});

router.delete('/:id',AuthMiddleware, async (req,res) => {
    const snippet = await Snippet.findById(req.params.id);

  if (!snippet) {
    return res.status(404).json({ error: "Snippet not found" });
  }

  if (snippet.userId.toString() !== req.user.id) {
    return res.status(403).json({ error: "You are not allowed to delete this snippet" });
  }
    await Snippet.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

router.put('/:id',AuthMiddleware, async (req,res) => {
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body,{new : true});
    res.json(snippet);
})

module.exports = router;