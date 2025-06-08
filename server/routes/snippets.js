const express = require("express");
const Snippet = require("../models/Snippet");
const router = express.Router();



router.get('/', async(req,res) => {
    const snippets = await Snippet.find();
    res.json(snippets);
});

router.post('/', async(req,res) => {
    const snippet = new Snippet(req.body);
    await snippet.save();
    res.status(201).json(snippet);
});

router.delete('/:id', async (req,res) => {
    const snippet = Snippet.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

router.put('/:id', async (req,res) => {
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body,{new : true});
    res.json(snippet);
})

module.exports = router;