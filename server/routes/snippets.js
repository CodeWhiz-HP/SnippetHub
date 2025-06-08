const express = require("express");
const Snippet = require("../models/Snippet");
const router = express.Router();
const AuthMiddleware = require("../routes/auth")



router.get('/',AuthMiddleware, async(req,res) => {
    const snippets = await Snippet.find();
    res.json(snippets);
});

router.post('/',AuthMiddleware, async(req,res) => {
    const snippet = new Snippet(req.body);
    await snippet.save();
    res.status(201).json(snippet);
});

router.delete('/:id',AuthMiddleware, async (req,res) => {
    const snippet = Snippet.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

router.put('/:id',AuthMiddleware, async (req,res) => {
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body,{new : true});
    res.json(snippet);
})

module.exports = router;